import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { XMarkIcon, PlusIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

// Types
interface Dealer {
    id: string;
    name: string;
    email: string;
    phone: string;
    alternatePhone?: string;
    contactPerson?: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    type: 'distributor' | 'service_center' | 'dealer';
    services?: string[];
    brands?: string[];
    website?: string;
    territory?: string;
    description?: string;
    isActive: boolean;
    isFeatured: boolean;
    rating: number;
    totalReviews: number;
    latitude?: number;
    longitude?: number;
}

interface DealerFormProps {
    dealer?: Dealer | null;
    onSubmit: (formData: FormData) => Promise<void>;
    onCancel: () => void;
    isLoading?: boolean;
}

// Manually define the form data type to match what we expect
interface DealerFormData {
    name: string;
    email: string;
    phone: string;
    alternatePhone?: string | null;
    contactPerson?: string | null;
    address: string;
    city: string;
    state: string;
    pincode: string;
    type: 'distributor' | 'service_center' | 'dealer';
    website?: string | null;
    territory?: string | null;
    description?: string | null;
    isActive: boolean;
    isFeatured: boolean;
    rating: number;
    latitude?: number | null;
    longitude?: number | null;
}

// Validation schema with proper optional fields
const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().matches(/^\d{10}$/, 'Phone must be 10 digits').required('Phone is required'),
    alternatePhone: yup.string()
        .transform((value) => (value === '' ? undefined : value))
        .matches(/^\d{10}$/, 'Phone must be 10 digits')
        .optional(),
    contactPerson: yup.string()
        .transform((value) => (value === '' ? undefined : value))
        .optional(),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    pincode: yup.string().matches(/^\d{6}$/, 'Pincode must be 6 digits').required('Pincode is required'),
    type: yup.mixed<'distributor' | 'service_center' | 'dealer'>()
        .oneOf(['distributor', 'service_center', 'dealer'])
        .required('Type is required'),
    website: yup.string()
        .transform((value) => (value === '' ? undefined : value))
        .matches(
            /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
            'Invalid URL'
        )
        .optional(),
    territory: yup.string()
        .transform((value) => (value === '' ? undefined : value))
        .optional(),
    description: yup.string()
        .transform((value) => (value === '' ? undefined : value))
        .optional(),
    isActive: yup.boolean().required(),
    isFeatured: yup.boolean().required(),
    rating: yup.number().min(0).max(5).required(),
    latitude: yup.number()
        .transform((value, originalValue) => {
            if (originalValue === '' || originalValue === null || originalValue === undefined) {
                return undefined;
            }
            return Number(originalValue);
        })
        .min(-90, 'Latitude must be between -90 and 90')
        .max(90, 'Latitude must be between -90 and 90')
        .optional(),
    longitude: yup.number()
        .transform((value, originalValue) => {
            if (originalValue === '' || originalValue === null || originalValue === undefined) {
                return undefined;
            }
            return Number(originalValue);
        })
        .min(-180, 'Longitude must be between -180 and 180')
        .max(180, 'Longitude must be between -180 and 180')
        .optional(),
});

const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Chandigarh'
];

// Star Rating Component
const StarRating: React.FC<{
    value: number;
    onChange: (rating: number) => void;
    readonly?: boolean;
}> = ({ value, onChange, readonly = false }) => {
    const [hover, setHover] = useState<number | null>(null);

    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    disabled={readonly}
                    className={`${readonly ? 'cursor-default' : 'cursor-pointer'} transition-colors`}
                    onClick={() => !readonly && onChange(star)}
                    onMouseEnter={() => !readonly && setHover(star)}
                    onMouseLeave={() => !readonly && setHover(null)}
                >
                    {(hover !== null ? star <= hover : star <= value) ? (
                        <StarIconSolid className="h-6 w-6 text-yellow-400" />
                    ) : (
                        <StarIcon className="h-6 w-6 text-gray-300 hover:text-yellow-200" />
                    )}
                </button>
            ))}
            <span className="ml-2 text-sm text-gray-600">
                {value > 0 ? `${value}.0 / 5.0` : 'Not rated'}
            </span>
        </div>
    );
};

const DealerForm: React.FC<DealerFormProps> = ({
                                                   dealer,
                                                   onSubmit,
                                                   onCancel,
                                                   isLoading = false,
                                               }) => {
    const [images, setImages] = useState<File[]>([]);
    const [services, setServices] = useState<string[]>(dealer?.services || []);
    const [brands, setBrands] = useState<string[]>(dealer?.brands || []);
    const [newService, setNewService] = useState('');
    const [newBrand, setNewBrand] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
    } = useForm<DealerFormData>({
        resolver: yupResolver(schema) as never, // Type assertion to bypass strict type checking
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            alternatePhone: '',
            contactPerson: '',
            address: '',
            city: '',
            state: '',
            pincode: '',
            type: 'dealer',
            website: '',
            territory: '',
            description: '',
            isActive: true,
            isFeatured: false,
            rating: 0,
            latitude: undefined,
            longitude: undefined,
        },
    });

    const watchedRating = watch('rating');

    useEffect(() => {
        if (dealer) {
            reset({
                name: dealer.name,
                email: dealer.email,
                phone: dealer.phone,
                alternatePhone: dealer.alternatePhone || '',
                contactPerson: dealer.contactPerson || '',
                address: dealer.address,
                city: dealer.city,
                state: dealer.state,
                pincode: dealer.pincode,
                type: dealer.type,
                website: dealer.website || '',
                territory: dealer.territory || '',
                description: dealer.description || '',
                isActive: dealer.isActive,
                isFeatured: dealer.isFeatured,
                rating: dealer.rating || 0,
                latitude: dealer.latitude,
                longitude: dealer.longitude,
            });
            setServices(dealer.services || []);
            setBrands(dealer.brands || []);
        }
    }, [dealer, reset]);

    const handleFormSubmit: SubmitHandler<DealerFormData> = async (data) => {
        const formData = new FormData();

        // Process form fields - only add non-empty values
        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                formData.append(key, String(value));
            }
        });

        // Add arrays as JSON strings
        if (services.length > 0) {
            formData.append('services', JSON.stringify(services));
        }
        if (brands.length > 0) {
            formData.append('brands', JSON.stringify(brands));
        }

        // Add images
        images.forEach((image) => {
            formData.append('images', image);
        });

        await onSubmit(formData);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages(Array.from(e.target.files));
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, action: () => void) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            action();
        }
    };

    const addService = () => {
        if (newService.trim() && !services.includes(newService.trim())) {
            setServices([...services, newService.trim()]);
            setNewService('');
        }
    };

    const removeService = (index: number) => {
        setServices(services.filter((_, i) => i !== index));
    };

    const addBrand = () => {
        if (newBrand.trim() && !brands.includes(newBrand.trim())) {
            setBrands([...brands, newBrand.trim()]);
            setNewBrand('');
        }
    };

    const removeBrand = (index: number) => {
        setBrands(brands.filter((_, i) => i !== index));
    };

    const cn = (...classes: (string | boolean | undefined)[]) => {
        return classes.filter(Boolean).join(' ');
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="col-span-2">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                        {...register('name')}
                        className={cn(
                            'w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500',
                            errors.name && 'border-red-300'
                        )}
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                    <select
                        {...register('type')}
                        className={cn(
                            'w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500',
                            errors.type && 'border-red-300'
                        )}
                    >
                        <option value="dealer">Dealer</option>
                        <option value="distributor">Distributor</option>
                        <option value="service_center">Service Center</option>
                    </select>
                    {errors.type && (
                        <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                        type="email"
                        {...register('email')}
                        className={cn(
                            'w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500',
                            errors.email && 'border-red-300'
                        )}
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                    <input
                        {...register('contactPerson')}
                        className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input
                        {...register('phone')}
                        placeholder="10 digit mobile number"
                        className={cn(
                            'w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500',
                            errors.phone && 'border-red-300'
                        )}
                    />
                    {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Alternate Phone <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <input
                        {...register('alternatePhone')}
                        placeholder="10 digit mobile number"
                        className={cn(
                            'w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500',
                            errors.alternatePhone && 'border-red-300'
                        )}
                    />
                    {errors.alternatePhone && (
                        <p className="mt-1 text-sm text-red-600">{errors.alternatePhone.message}</p>
                    )}
                </div>

                {/* Rating Section */}
                <div className="col-span-2">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 mt-6">Rating & Reviews</h3>
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dealer Rating
                    </label>
                    <StarRating
                        value={watchedRating || 0}
                        onChange={(rating) => setValue('rating', rating)}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        Set an initial rating for this dealer. Customer reviews can be added later.
                    </p>
                </div>

                {/* Address Information */}
                <div className="col-span-2">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 mt-6">Address Information</h3>
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                    <textarea
                        {...register('address')}
                        rows={3}
                        className={cn(
                            'w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500',
                            errors.address && 'border-red-300'
                        )}
                    />
                    {errors.address && (
                        <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input
                        {...register('city')}
                        className={cn(
                            'w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500',
                            errors.city && 'border-red-300'
                        )}
                    />
                    {errors.city && (
                        <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                    <select
                        {...register('state')}
                        className={cn(
                            'w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500',
                            errors.state && 'border-red-300'
                        )}
                    >
                        <option value="">Select State</option>
                        {indianStates.map((state) => (
                            <option key={state} value={state}>
                                {state}
                            </option>
                        ))}
                    </select>
                    {errors.state && (
                        <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
                    <input
                        {...register('pincode')}
                        placeholder="6 digit pincode"
                        maxLength={6}
                        className={cn(
                            'w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500',
                            errors.pincode && 'border-red-300'
                        )}
                    />
                    {errors.pincode && (
                        <p className="mt-1 text-sm text-red-600">{errors.pincode.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Territory</label>
                    <input
                        {...register('territory')}
                        placeholder="e.g., North Delhi"
                        className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Additional Information */}
                <div className="col-span-2">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 mt-6">Additional Information</h3>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <input
                        {...register('website')}
                        placeholder="https://example.com"
                        className={cn(
                            'w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500',
                            errors.website && 'border-red-300'
                        )}
                    />
                    {errors.website && (
                        <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    {images.length > 0 && (
                        <p className="mt-1 text-sm text-gray-600">
                            {images.length} file(s) selected
                        </p>
                    )}
                </div>

                {/* Services */}
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Services</label>
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={newService}
                            onChange={(e) => setNewService(e.target.value)}
                            onKeyPress={(e) => handleKeyPress(e, addService)}
                            placeholder="Add a service"
                            className="flex-1 px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                            type="button"
                            onClick={addService}
                            className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            <PlusIcon className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {services.map((service, index) => (
                            <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                                {service}
                                <button
                                    type="button"
                                    onClick={() => removeService(index)}
                                    className="ml-2"
                                >
                                    <XMarkIcon className="h-3 w-3" />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Brands */}
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Brands</label>
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={newBrand}
                            onChange={(e) => setNewBrand(e.target.value)}
                            onKeyPress={(e) => handleKeyPress(e, addBrand)}
                            placeholder="Add a brand"
                            className="flex-1 px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                            type="button"
                            onClick={addBrand}
                            className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            <PlusIcon className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {brands.map((brand, index) => (
                            <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                                {brand}
                                <button
                                    type="button"
                                    onClick={() => removeBrand(index)}
                                    className="ml-2"
                                >
                                    <XMarkIcon className="h-3 w-3" />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        {...register('description')}
                        rows={4}
                        className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Coordinates (Optional) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Latitude <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <input
                        type="number"
                        step="0.00000001"
                        {...register('latitude')}
                        placeholder="e.g., 28.6139"
                        className={cn(
                            'w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500',
                            errors.latitude && 'border-red-300'
                        )}
                    />
                    {errors.latitude && (
                        <p className="mt-1 text-sm text-red-600">{errors.latitude.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Longitude <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <input
                        type="number"
                        step="0.00000001"
                        {...register('longitude')}
                        placeholder="e.g., 77.2090"
                        className={cn(
                            'w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500',
                            errors.longitude && 'border-red-300'
                        )}
                    />
                    {errors.longitude && (
                        <p className="mt-1 text-sm text-red-600">{errors.longitude.message}</p>
                    )}
                </div>

                {/* Status */}
                <div className="col-span-2">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 mt-6">Status</h3>
                </div>

                <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            {...register('isActive')}
                            className="rounded border-gray-300 text-blue-600 mr-2"
                        />
                        <span>Active</span>
                    </label>

                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            {...register('isFeatured')}
                            className="rounded border-gray-300 text-blue-600 mr-2"
                        />
                        <span>Featured</span>
                    </label>
                </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                    {isLoading ? 'Saving...' : dealer ? 'Update Dealer' : 'Create Dealer'}
                </button>
            </div>
        </form>
    );
};

export default DealerForm;