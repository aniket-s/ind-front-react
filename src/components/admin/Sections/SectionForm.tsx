// src/components/admin/Sections/SectionForm.tsx
import React, { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { apiClient } from '@/services/api';
import { Section } from '@/types';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import toast from 'react-hot-toast';
import { cn } from '@/utils';

const schema = yup.object({
    type: yup.string().required('Type is required'),
    title: yup.string(),
    subtitle: yup.string(),
    isActive: yup.boolean(),
    sortOrder: yup.number(),
});

type FormData = yup.InferType<typeof schema>;

interface SectionFormProps {
    sectionId?: string | null;
    onSuccess: () => void;
    onCancel: () => void;
}

const SectionForm: React.FC<SectionFormProps> = ({
                                                     sectionId,
                                                     onSuccess,
                                                     onCancel,
                                                 }) => {
    const queryClient = useQueryClient();
    const isEdit = !!sectionId;

    const { data: section, isLoading: sectionLoading } = useQuery({
        queryKey: ['section', sectionId],
        queryFn: async () => {
            const { data } = await apiClient.axios.get<Section>(`/sections/${sectionId}`);
            return data;
        },
        enabled: isEdit,
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            isActive: true,
            sortOrder: 0,
        },
    });

    const sectionType = watch('type');

    useEffect(() => {
        if (section) {
            reset({
                type: section.type,
                title: section.title || '',
                subtitle: section.subtitle || '',
                isActive: section.isActive,
                sortOrder: section.sortOrder,
            });
        }
    }, [section, reset]);

    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            const payload = {
                ...data,
                content: {}, // Would be populated based on section type
                settings: {}, // Would be populated based on section type
            };

            if (isEdit) {
                const { data: response } = await apiClient.axios.put(`/sections/${sectionId}`, payload);
                return response;
            } else {
                const { data: response } = await apiClient.axios.post('/sections', payload);
                return response;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sections'] });
            toast.success(`Section ${isEdit ? 'updated' : 'created'} successfully`);
            onSuccess();
        },
    });

    const onSubmit = (data: FormData) => {
        mutation.mutate(data);
    };

    if (sectionLoading) {
        return <LoadingSpinner />;
    }

    const sectionTypes = [
        { value: 'banner', label: 'Hero Banner', description: 'Main banner carousel for homepage' },
        { value: 'products', label: 'Featured Products', description: 'Display featured products' },
        { value: 'whyIndpower', label: 'Why IndPower', description: 'Company benefits and features' },
        { value: 'about', label: 'About Section', description: 'Brief company introduction' },
        { value: 'viewDetails', label: 'View Details', description: 'Product details call-to-action' },
        { value: 'dealerLocator', label: 'Dealer Locator', description: 'Find dealers section' },
        { value: 'joinDealer', label: 'Join as Dealer', description: 'Dealer recruitment section' },
        { value: 'connect', label: 'Connect With Us', description: 'Contact information section' },
        { value: 'faq', label: 'FAQs', description: 'Frequently asked questions' },
        { value: 'stillHaveQuestions', label: 'Still Have Questions', description: 'Contact prompt section' },
        { value: 'custom', label: 'Custom Section', description: 'Custom content section' },
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label className="label">Section Type *</label>
                <select
                    {...register('type')}
                    className={cn('input', errors.type && 'border-red-300')}
                    disabled={isEdit}
                >
                    <option value="">Select type</option>
                    {sectionTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                            {type.label}
                        </option>
                    ))}
                </select>
                {errors.type && (
                    <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
                )}
                {sectionType && (
                    <p className="mt-1 text-sm text-gray-500">
                        {sectionTypes.find(t => t.value === sectionType)?.description}
                    </p>
                )}
            </div>

            <div>
                <label className="label">Title</label>
                <input
                    type="text"
                    {...register('title')}
                    className="input"
                    placeholder="Section title (optional)"
                />
            </div>

            <div>
                <label className="label">Subtitle</label>
                <input
                    type="text"
                    {...register('subtitle')}
                    className="input"
                    placeholder="Section subtitle (optional)"
                />
            </div>

            {sectionType && (
                <div className="card bg-gray-50">
                    <div className="card-body">
                        <h4 className="text-sm font-medium text-gray-900 mb-4">Section Content</h4>
                        <p className="text-sm text-gray-600">
                            Section-specific content configuration would appear here based on the selected type.
                            This would include fields for images, text content, settings, etc.
                        </p>
                    </div>
                </div>
            )}

            <div>
                <label className="label">Sort Order</label>
                <input
                    type="number"
                    {...register('sortOrder')}
                    className="input"
                />
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
                        <>{isEdit ? 'Update' : 'Create'} Section</>
                    )}
                </button>
            </div>
        </form>
    );
};

export default SectionForm;