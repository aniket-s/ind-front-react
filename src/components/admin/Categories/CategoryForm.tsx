// src/components/admin/Categories/CategoryForm.tsx
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { categoriesService } from '@/services/categories.service';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { PhotoIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import {cn, getImageUrl} from '@/utils';

const schema = yup.object({
    name: yup.string().required('Name is required'),
    slug: yup.string().default(''),
    description: yup.string().default(''),
    parentId: yup.string().nullable().default(null),
    isActive: yup.boolean().default(true),
    sortOrder: yup.number().default(0),
});

type FormData = yup.InferType<typeof schema>;

interface CategoryFormProps {
    categoryId?: string | null;
    onSuccess: () => void;
    onCancel: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
                                                       categoryId,
                                                       onSuccess,
                                                       onCancel,
                                                   }) => {
    const queryClient = useQueryClient();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const isEdit = !!categoryId;

    const { data: category, isLoading: categoryLoading } = useQuery({
        queryKey: ['category', categoryId],
        queryFn: () => categoriesService.getCategory(categoryId!),
        enabled: isEdit,
    });

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => categoriesService.getCategories(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            slug: '',
            description: '',
            parentId: null,
            isActive: true,
            sortOrder: 0,
        },
    });

    useEffect(() => {
        if (category) {
            reset({
                name: category.name,
                slug: category.slug || '',
                description: category.description || '',
                parentId: category.parentId || null,
                isActive: category.isActive ?? true,
                sortOrder: category.sortOrder ?? 0,
            });
            if (category.image) {
                setImagePreview(getImageUrl(category.image));
            }
        }
    }, [category, reset]);

    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    formData.append(key, value.toString());
                }
            });

            if (imageFile) {
                formData.append('image', imageFile);
            }

            if (isEdit) {
                return categoriesService.updateCategory(categoryId!, formData);
            } else {
                return categoriesService.createCategory(formData);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            queryClient.invalidateQueries({ queryKey: ['categories-tree'] });
            toast.success(`Category ${isEdit ? 'updated' : 'created'} successfully`);
            onSuccess();
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const onSubmit = (data: FormData) => {
        mutation.mutate(data);
    };

    if (categoryLoading) {
        return <LoadingSpinner />;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="label">Name *</label>
                <input
                    type="text"
                    {...register('name')}
                    className={cn('input', errors.name && 'border-red-300')}
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
            </div>

            <div>
                <label className="label">Slug</label>
                <input
                    type="text"
                    {...register('slug')}
                    className="input"
                    placeholder="auto-generated-from-name"
                />
            </div>

            <div>
                <label className="label">Parent Category</label>
                <select {...register('parentId')} className="input">
                    <option value="">None (Top Level)</option>
                    {categories
                        ?.filter((cat) => cat.id !== categoryId)
                        .map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                </select>
            </div>

            <div>
                <label className="label">Description</label>
                <textarea {...register('description')} rows={3} className="input" />
            </div>

            <div>
                <label className="label">Image</label>
                <div className="mt-1 flex items-center space-x-4">
                    {imagePreview ? (
                        <img
                            src={imagePreview}
                            alt="Category"
                            className="h-20 w-20 rounded-lg object-cover"
                        />
                    ) : (
                        <div className="h-20 w-20 rounded-lg bg-gray-100 flex items-center justify-center">
                            <PhotoIcon className="h-8 w-8 text-gray-400" />
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                    />
                </div>
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
                        <>{isEdit ? 'Update' : 'Create'} Category</>
                    )}
                </button>
            </div>
        </form>
    );
};

export default CategoryForm;