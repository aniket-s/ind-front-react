// src/components/admin/Banners/BannerForm.tsx
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { apiClient } from '@/services/api';
import { Banner } from '@/types';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { PhotoIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { cn, getImageUrl } from '@/utils';

const schema = yup.object({
    title: yup.string().required('Title is required'),
    subtitle: yup.string().default(''),
    description: yup.string().default(''),
    link: yup.string().url('Must be a valid URL').default(''),
    linkText: yup.string().default(''),
    position: yup.string().required('Position is required'),
    isActive: yup.boolean().default(true),
    sortOrder: yup.number().default(0),
    startDate: yup.date().nullable().default(null),
    endDate: yup.date().nullable().default(null)
        .when('startDate', {
            is: (startDate: Date | null | undefined) => !!startDate,
            then: (schema) => schema.test(
                'is-after-start',
                'End date must be after start date',
                function(endDate) {
                    const { startDate } = this.parent;
                    if (!startDate || !endDate) return true;
                    return endDate > startDate;
                }
            ),
            otherwise: (schema) => schema,
        }),
});

type FormData = yup.InferType<typeof schema>;

interface BannerFormProps {
    bannerId?: string | null;
    onSuccess: () => void;
    onCancel: () => void;
}

const BannerForm: React.FC<BannerFormProps> = ({
                                                   bannerId,
                                                   onSuccess,
                                                   onCancel,
                                               }) => {
    const queryClient = useQueryClient();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [mobileImageFile, setMobileImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [mobileImagePreview, setMobileImagePreview] = useState<string | null>(null);
    const isEdit = !!bannerId;

    const { data: banner, isLoading: bannerLoading } = useQuery({
        queryKey: ['banner', bannerId],
        queryFn: async () => {
            const { data } = await apiClient.axios.get<Banner>(`/banners/${bannerId}`);
            return data;
        },
        enabled: isEdit,
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            isActive: true,
            sortOrder: 0,
            linkText: 'Learn More',
        },
    });

    useEffect(() => {
        if (banner) {
            reset({
                title: banner.title,
                subtitle: banner.subtitle || '',
                description: banner.description || '',
                link: banner.link || '',
                linkText: banner.linkText,
                position: banner.position,
                isActive: banner.isActive,
                sortOrder: banner.sortOrder,
                startDate: banner.startDate ? new Date(banner.startDate) : null,
                endDate: banner.endDate ? new Date(banner.endDate) : null,
            });
            if (banner.image) {
                setImagePreview(getImageUrl(banner.image));
            }
            if (banner.mobileImage) {
                setMobileImagePreview(getImageUrl(banner.mobileImage));
            }
        }
    }, [banner, reset]);

    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    if (value instanceof Date) {
                        formData.append(key, value.toISOString());
                    } else {
                        formData.append(key, value.toString());
                    }
                }
            });

            if (imageFile) {
                formData.append('image', imageFile);
            }
            if (mobileImageFile) {
                formData.append('mobileImage', mobileImageFile);
            }

            if (isEdit) {
                const { data } = await apiClient.axios.put(`/banners/${bannerId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                return data;
            } else {
                const { data } = await apiClient.axios.post('/banners', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                return data;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['banners'] });
            toast.success(`Banner ${isEdit ? 'updated' : 'created'} successfully`);
            onSuccess();
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'desktop' | 'mobile') => {
        const file = e.target.files?.[0];
        if (file) {
            if (type === 'desktop') {
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
            } else {
                setMobileImageFile(file);
                setMobileImagePreview(URL.createObjectURL(file));
            }
        }
    };

    const onSubmit = (data: FormData) => {
        if (!isEdit && !imageFile) {
            toast.error('Please upload a banner image');
            return;
        }
        mutation.mutate(data);
    };

    if (bannerLoading) {
        return <LoadingSpinner />;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
                <div>
                    <label className="label">Title *</label>
                    <input
                        type="text"
                        {...register('title')}
                        className={cn('input', errors.title && 'border-red-300')}
                    />
                    {errors.title && (
                        <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                    )}
                </div>

                <div>
                    <label className="label">Subtitle</label>
                    <input
                        type="text"
                        {...register('subtitle')}
                        className="input"
                    />
                </div>

                <div>
                    <label className="label">Description</label>
                    <textarea
                        {...register('description')}
                        rows={3}
                        className="input"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="label">Link URL</label>
                        <input
                            type="url"
                            {...register('link')}
                            className={cn('input', errors.link && 'border-red-300')}
                            placeholder="https://example.com"
                        />
                        {errors.link && (
                            <p className="mt-1 text-sm text-red-600">{errors.link.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="label">Link Text</label>
                        <input
                            type="text"
                            {...register('linkText')}
                            className="input"
                        />
                    </div>
                </div>
            </div>

            {/* Images */}
            <div className="space-y-4">
                <div>
                    <label className="label">Desktop Image {!isEdit && '*'}</label>
                    <div className="mt-1 flex items-center space-x-4">
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Banner"
                                className="h-20 w-32 rounded-lg object-cover"
                            />
                        ) : (
                            <div className="h-20 w-32 rounded-lg bg-gray-100 flex items-center justify-center">
                                <PhotoIcon className="h-8 w-8 text-gray-400" />
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, 'desktop')}
                            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                        />
                    </div>
                </div>

                <div>
                    <label className="label">Mobile Image (Optional)</label>
                    <div className="mt-1 flex items-center space-x-4">
                        {mobileImagePreview ? (
                            <img
                                src={mobileImagePreview}
                                alt="Mobile Banner"
                                className="h-20 w-32 rounded-lg object-cover"
                            />
                        ) : (
                            <div className="h-20 w-32 rounded-lg bg-gray-100 flex items-center justify-center">
                                <PhotoIcon className="h-8 w-8 text-gray-400" />
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, 'mobile')}
                            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                        />
                    </div>
                </div>
            </div>

            {/* Settings */}
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="label">Position *</label>
                        <select
                            {...register('position')}
                            className={cn('input', errors.position && 'border-red-300')}
                        >
                            <option value="">Select position</option>
                            <option value="home">Home</option>
                            <option value="products">Products</option>
                            <option value="about">About</option>
                            <option value="contact">Contact</option>
                        </select>
                        {errors.position && (
                            <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="label">Sort Order</label>
                        <input
                            type="number"
                            {...register('sortOrder')}
                            className="input"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="label">Start Date</label>
                        <input
                            type="datetime-local"
                            {...register('startDate')}
                            className="input"
                        />
                    </div>

                    <div>
                        <label className="label">End Date</label>
                        <input
                            type="datetime-local"
                            {...register('endDate')}
                            className={cn('input', errors.endDate && 'border-red-300')}
                        />
                        {errors.endDate && (
                            <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            {...register('isActive')}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Active</span>
                    </label>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="btn btn-outline btn-md"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="btn btn-primary btn-md"
                >
                    {mutation.isPending ? (
                        <LoadingSpinner size="sm" className="text-white" />
                    ) : (
                        <>{isEdit ? 'Update' : 'Create'} Banner</>
                    )}
                </button>
            </div>
        </form>
    );
};

export default BannerForm;