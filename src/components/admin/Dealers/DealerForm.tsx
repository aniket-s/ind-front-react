import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Dealer } from '@/types';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { cn } from '@/utils';

interface DealerFormProps {
    dealer?: Dealer | null;
    onSubmit: (formData: FormData) => Promise<void>;
    onCancel: () => void;
    isLoading?: boolean;
}

const schema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().matches(/^\d{10}$/, 'Phone must be 10 digits').required('Phone is required'),
    alternatePhone: yup.string().matches(/^\d{10}$/, 'Phone must be 10 digits').optional().nullable(),
    contactPerson: yup.string().optional(),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    pincode: yup.string().matches(/^\d{6}$/, 'Pincode must be 6 digits').required('Pincode is required'),
    type: yup.mixed<'distributor' | 'service_center' | 'dealer'>()
        .oneOf(['distributor', 'service_center', 'dealer']).required('Type is required'),
    website: yup.string().url('Invalid URL').optional().nullable(),
    territory: yup.string().optional(),
    description: yup.string().optional(),
    isActive: yup.boolean(),
    isFeatured: yup.boolean(),
    latitude: yup.number().min(-90).max(90).optional().nullable(),
    longitude: yup.number().min(-180).max(180).optional().nullable(),
});

type FormData = yup.InferType<typeof schema>;

const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Chandigarh'
];

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
        setValue,
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            type: 'dealer',
            isActive: true,
            isFeatured: false,
        },
    });

    useEffect(() => {
        if (dealer) {
            reset({
                name: dealer.name,
                email: dealer.email,
                phone: dealer.phone,
                alternatePhone: dealer.alternatePhone,
                contactPerson: dealer.contactPerson,
                address: dealer.address,
                city: dealer.city,
                state: dealer.state,
                pincode: dealer.pincode,
                type: dealer.type,
                website: dealer.website,
                territory: dealer.territory,
                description: dealer.description,
                isActive: dealer.isActive,
                isFeatured: dealer.isFeatured,
                latitude: dealer.latitude,
                longitude: dealer.longitude,
            });
            setServices(dealer.services || []);
            setBrands(dealer.brands || []);
        }
    }, [dealer, reset]);

    const handleFormSubmit: SubmitHandler<FormData> = async (data) => {
        const formData = new FormData();

        // Add all form fields
        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, String(value));
            }
        });

        // Add arrays as JSON strings
        formData.append('services', JSON.stringify(services));
        formData.append('brands', JSON.stringify(brands));

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

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="col-span-2">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                </div>

                <div>
                    <label className="label">Name *</label>
                    <input
                        {...register('name')}
                        className={cn('input', errors.name && 'border-red-300')}
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <label className="label">Type *</label>
                    <select
                        {...register('type')}
                        className={cn('input', errors.type && 'border-red-300')}
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
                    <label className="label">Email *</label>
                    <input
                        type="email"
                        {...register('email')}
                        className={cn('input', errors.email && 'border-red-300')}
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label className="label">Contact Person</label>
                    <input
                        {...register('contactPerson')}
                        className={cn('input', errors.contactPerson && 'border-red-300')}
                    />
                </div>

                <div>
                    <label className="label">Phone *</label>
                    <input
                        {...register('phone')}
                        placeholder="10 digit mobile number"
                        className={cn('input', errors.phone && 'border-red-300')}
                    />
                    {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                </div>

                <div>
                    <label className="label">Alternate Phone</label>
                    <input
                        {...register('alternatePhone')}
                        placeholder="10 digit mobile number"
                        className={cn('input', errors.alternatePhone && 'border-red-300')}
                    />
                    {errors.alternatePhone && (
                        <p className="mt-1 text-sm text-red-600">{errors.alternatePhone.message}</p>
                    )}
                </div>

                {/* Address Information */}
                <div className="col-span-2">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 mt-6">Address Information</h3>
                </div>

                <div className="col-span-2">
                    <label className="label">Address *</label>
                    <textarea
                        {...register('address')}
                        rows={3}
                        className={cn('input', errors.address && 'border-red-300')}
                    />
                    {errors.address && (
                        <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                    )}
                </div>

                <div>
                    <label className="label">City *</label>
                    <input
                        {...register('city')}
                        className={cn('input', errors.city && 'border-red-300')}
                    />
                    {errors.city && (
                        <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                    )}
                </div>

                <div>
                    <label className="label">State *</label>
                    <select
                        {...register('state')}
                        className={cn('input', errors.state && 'border-red-300')}
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
                    <label className="label">Pincode *</label>
                    <input
                        {...register('pincode')}
                        placeholder="6 digit pincode"
                        maxLength={6}
                        className={cn('input', errors.pincode && 'border-red-300')}
                    />
                    {errors.pincode && (
                        <p className="mt-1 text-sm text-red-600">{errors.pincode.message}</p>
                    )}
                </div>

                <div>
                    <label className="label">Territory</label>
                    <input
                        {...register('territory')}
                        placeholder="e.g., North Delhi"
                        className="input"
                    />
                </div>

                {/* Additional Information */}
                <div className="col-span-2">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 mt-6">Additional Information</h3>
                </div>

                <div>
                    <label className="label">Website</label>
                    <input
                        {...register('website')}
                        placeholder="https://example.com"
                        className={cn('input', errors.website && 'border-red-300')}
                    />
                    {errors.website && (
                        <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
                    )}
                </div>

                <div>
                    <label className="label">Images</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="input"
                    />
                    {images.length > 0 && (
                        <p className="mt-1 text-sm text-gray-600">
                            {images.length} file(s) selected
                        </p>
                    )}
                </div>

                {/* Services */}
                <div className="col-span-2">
                    <label className="label">Services</label>
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={newService}
                            onChange={(e) => setNewService(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addService())}
                            placeholder="Add a service"
                            className="input flex-1"
                        />
                        <button
                            type="button"
                            onClick={addService}
                            className="btn btn-outline btn-sm"
                        >
                            <PlusIcon className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {services.map((service, index) => (
                            <span key={index} className="badge badge-info">
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
                    <label className="label">Brands</label>
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={newBrand}
                            onChange={(e) => setNewBrand(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBrand())}
                            placeholder="Add a brand"
                            className="input flex-1"
                        />
                        <button
                            type="button"
                            onClick={addBrand}
                            className="btn btn-outline btn-sm"
                        >
                            <PlusIcon className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {brands.map((brand, index) => (
                            <span key={index} className="badge badge-success">
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
                    <label className="label">Description</label>
                    <textarea
                        {...register('description')}
                        rows={4}
                        className="input"
                    />
                </div>

                {/* Coordinates (Optional) */}
                <div>
                    <label className="label">Latitude (Optional)</label>
                    <input
                        type="number"
                        step="0.00000001"
                        {...register('latitude')}
                        className={cn('input', errors.latitude && 'border-red-300')}
                    />
                </div>

                <div>
                    <label className="label">Longitude (Optional)</label>
                    <input
                        type="number"
                        step="0.00000001"
                        {...register('longitude')}
                        className={cn('input', errors.longitude && 'border-red-300')}
                    />
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
                            className="rounded border-gray-300 text-primary-600"
                        />
                        <span className="ml-2">Active</span>
                    </label>

                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            {...register('isFeatured')}
                            className="rounded border-gray-300 text-primary-600"
                        />
                        <span className="ml-2">Featured</span>
                    </label>
                </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
                <button
                    type="button"
                    onClick={onCancel}
                    className="btn btn-outline btn-md"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary btn-md"
                >
                    {isLoading ? 'Saving...' : dealer ? 'Update Dealer' : 'Create Dealer'}
                </button>
            </div>
        </form>
    );
};

export default DealerForm;