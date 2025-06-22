// src/components/admin/FAQs/FAQForm.tsx
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { apiClient } from '@/services/api';
import { FAQ } from '@/types';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import toast from 'react-hot-toast';
import { cn } from '@/utils';

const schema = yup.object({
    category: yup.string().required('Category is required'),
    question: yup.string().required('Question is required'),
    answer: yup.string().required('Answer is required'),
    isActive: yup.boolean(),
    sortOrder: yup.number(),
});

type FormData = yup.InferType<typeof schema>;

interface FAQFormProps {
    faqId?: string | null;
    categories: string[];
    onSuccess: () => void;
    onCancel: () => void;
}

const FAQForm: React.FC<FAQFormProps> = ({
                                             faqId,
                                             categories,
                                             onSuccess,
                                             onCancel,
                                         }) => {
    const queryClient = useQueryClient();
    const [newCategory, setNewCategory] = useState('');
    const [isNewCategory, setIsNewCategory] = useState(false);
    const isEdit = !!faqId;

    const { data: faq, isLoading: faqLoading } = useQuery({
        queryKey: ['faq', faqId],
        queryFn: async () => {
            const { data } = await apiClient.axios.get<FAQ>(`/faqs/${faqId}`);
            return data;
        },
        enabled: isEdit,
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            isActive: true,
            sortOrder: 0,
        },
    });

    useEffect(() => {
        if (faq) {
            reset({
                category: faq.category,
                question: faq.question,
                answer: faq.answer,
                isActive: faq.isActive,
                sortOrder: faq.sortOrder,
            });
        }
    }, [faq, reset]);

    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            const finalData = {
                ...data,
                category: isNewCategory ? newCategory : data.category,
            };

            if (isEdit) {
                const { data: response } = await apiClient.axios.put(`/faqs/${faqId}`, finalData);
                return response;
            } else {
                const { data: response } = await apiClient.axios.post('/faqs', finalData);
                return response;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['faqs'] });
            queryClient.invalidateQueries({ queryKey: ['faq-categories'] });
            toast.success(`FAQ ${isEdit ? 'updated' : 'created'} successfully`);
            onSuccess();
        },
    });

    const onSubmit = (data: FormData) => {
        if (isNewCategory && !newCategory.trim()) {
            toast.error('Please enter a category name');
            return;
        }
        mutation.mutate(data);
    };

    if (faqLoading) {
        return <LoadingSpinner />;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="label">Category *</label>
                <div className="space-y-2">
                    {!isNewCategory ? (
                        <>
                            <select
                                {...register('category')}
                                className={cn('input', errors.category && 'border-red-300')}
                            >
                                <option value="">Select category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                            <button
                                type="button"
                                onClick={() => setIsNewCategory(true)}
                                className="text-sm text-primary-600 hover:text-primary-700"
                            >
                                + Add new category
                            </button>
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                placeholder="Enter new category name"
                                className="input"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setIsNewCategory(false);
                                    setNewCategory('');
                                }}
                                className="text-sm text-gray-600 hover:text-gray-700"
                            >
                                Select existing category
                            </button>
                        </>
                    )}
                </div>
                {errors.category && !isNewCategory && (
                    <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                )}
            </div>

            <div>
                <label className="label">Question *</label>
                <textarea
                    {...register('question')}
                    rows={2}
                    className={cn('input', errors.question && 'border-red-300')}
                />
                {errors.question && (
                    <p className="mt-1 text-sm text-red-600">{errors.question.message}</p>
                )}
            </div>

            <div>
                <label className="label">Answer *</label>
                <textarea
                    {...register('answer')}
                    rows={5}
                    className={cn('input', errors.answer && 'border-red-300')}
                />
                {errors.answer && (
                    <p className="mt-1 text-sm text-red-600">{errors.answer.message}</p>
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
                        <>{isEdit ? 'Update' : 'Create'} FAQ</>
                    )}
                </button>
            </div>
        </form>
    );
};

export default FAQForm;