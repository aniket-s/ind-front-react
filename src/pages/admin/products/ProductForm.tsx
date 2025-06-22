// src/pages/admin/products/ProductForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { productsService } from '@/services/products.service';
import { categoriesService } from '@/services/categories.service';
import ProductImageUpload from '@/components/admin/Products/ProductImageUpload';
import ProductSpecifications from '@/components/admin/Products/ProductSpecifications';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const schema = yup.object({
    name: yup.string().required('Name is required'),
    categoryId: yup.string().required('Category is required'),
    model: yup.string(),
    slug: yup.string(),
    description: yup.string(),
    shortDescription: yup.string(),
    price: yup.number().nullable(),
    discountPrice: yup.number().nullable(),
    warranty: yup.string(),
    isActive: yup.boolean(),
    isFeatured: yup.boolean(),
    metaTitle: yup.string(),
    metaDescription: yup.string(),
    metaKeywords: yup.string(),
});

type FormData = yup.InferType<typeof schema>;

const ProductForm: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const queryClient = useQueryClient();
    const isEdit = !!id;

    const [images, setImages] = useState<File[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [specifications, setSpecifications] = useState<Record<string, any>>({});
    const [features, setFeatures] = useState<string[]>([]);
    const [technicalSpecs, setTechnicalSpecs] = useState<Record<string, any>>({});

    const { data: product, isLoading: productLoading } = useQuery({
        queryKey: ['product', id],
        queryFn: () => productsService.getProduct(id!),
        enabled: isEdit,
    });

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => categoriesService.getCategories(),
    });

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            isActive: true,
            isFeatured: false,
        },
    });

    useEffect(() => {
        if (product) {
            reset({
                name: product.name,
                categoryId: product.categoryId,
                model: product.model || '',
                slug: product.slug,
                description: product.description || '',
                shortDescription: product.shortDescription || '',
                price: product.price || null,
                discountPrice: product.discountPrice || null,
                warranty: product.warranty || '',
                isActive: product.isActive,
                isFeatured: product.isFeatured,
                metaTitle: product.metaTitle || '',
                metaDescription: product.metaDescription || '',
                metaKeywords: product.metaKeywords || '',
            });
            setExistingImages(product.images || []);
            setSpecifications(product.specifications || {});
            setFeatures(product.features || []);
            setTechnicalSpecs(product.technicalSpecs || {});
        }
    }, [product, reset]);

    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            const formData = new FormData();

            // Add form fields
            Object.entries(data).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    formData.append(key, value.toString());
                }
            });

            // Add images
            images.forEach((image) => {
                formData.append('images', image);
            });

            // Add JSON fields
            formData.append('images', JSON.stringify(existingImages));
            formData.append('specifications', JSON.stringify(specifications));
            formData.append('features', JSON.stringify(features));
            formData.append('technicalSpecs', JSON.stringify(technicalSpecs));

            if (isEdit) {
                return productsService.updateProduct(id!, formData);
            } else {
                return productsService.createProduct(formData);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success(`Product ${isEdit ? 'updated' : 'created'} successfully`);
            navigate('/admin/products');
        },
    });

    const onSubmit = (data: FormData) => {
        mutation.mutate(data);
    };

    const handleDeleteImage = async (index: number) => {
        if (isEdit && existingImages[index]) {
            try {
                await productsService.deleteProductImage(id!, index);
                setExistingImages(existingImages.filter((_, i) => i !== index));
                toast.success('Image deleted successfully');
            } catch (error) {
                toast.error('Failed to delete image');
            }
        }
    };

    if (productLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => navigate('/admin/products')}
                    className="p-2 hover:bg-gray-100 rounded-md"
                >
                    <ArrowLeftIcon className="h-5 w-5" />
                </button>
                <h1 className="text-2xl font-semibold text-gray-900">
                    {isEdit ? 'Edit Product' : 'Add New Product'}
                </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Information */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-lg font-medium">Basic Information</h3>
                    </div>
                    <div className="card-body space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                <label className="label">Model</label>
                                <input
                                    type="text"
                                    {...register('model')}
                                    className="input"
                                />
                            </div>

                            <div>
                                <label className="label">Category *</label>
                                <select
                                    {...register('categoryId')}
                                    className={cn('input', errors.categoryId && 'border-red-300')}
                                >
                                    <option value="">Select category</option>
                                    {categories?.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.categoryId && (
                                    <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>
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
                        </div>

                        <div>
                            <label className="label">Short Description</label>
                            <textarea
                                {...register('shortDescription')}
                                rows={2}
                                className="input"
                            />
                        </div>

                        <div>
                            <label className="label">Description</label>
                            <textarea
                                {...register('description')}
                                rows={4}
                                className="input"
                            />
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-lg font-medium">Images</h3>
                    </div>
                    <div className="card-body">
                        <ProductImageUpload
                            images={images}
                            existingImages={existingImages}
                            onImagesChange={setImages}
                            onDeleteExisting={handleDeleteImage}
                        />
                    </div>
                </div>

                {/* Pricing & Inventory */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-lg font-medium">Pricing & Details</h3>
                    </div>
                    <div className="card-body">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="label">Price</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    {...register('price')}
                                    className="input"
                                />
                            </div>

                            <div>
                                <label className="label">Discount Price</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    {...register('discountPrice')}
                                    className="input"
                                />
                            </div>

                            <div>
                                <label className="label">Warranty</label>
                                <input
                                    type="text"
                                    {...register('warranty')}
                                    className="input"
                                    placeholder="e.g., 2 Years"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Specifications */}
                <ProductSpecifications
                    specifications={specifications}
                    features={features}
                    technicalSpecs={technicalSpecs}
                    onSpecificationsChange={setSpecifications}
                    onFeaturesChange={setFeatures}
                    onTechnicalSpecsChange={setTechnicalSpecs}
                />

                {/* SEO */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-lg font-medium">SEO</h3>
                    </div>
                    <div className="card-body space-y-4">
                        <div>
                            <label className="label">Meta Title</label>
                            <input
                                type="text"
                                {...register('metaTitle')}
                                className="input"
                            />
                        </div>

                        <div>
                            <label className="label">Meta Description</label>
                            <textarea
                                {...register('metaDescription')}
                                rows={2}
                                className="input"
                            />
                        </div>

                        <div>
                            <label className="label">Meta Keywords</label>
                            <input
                                type="text"
                                {...register('metaKeywords')}
                                className="input"
                                placeholder="comma, separated, keywords"
                            />
                        </div>
                    </div>
                </div>

                {/* Status */}
                <div className="card">
                    <div className="card-body">
                        <div className="space-y-4">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    {...register('isActive')}
                                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">Active</span>
                            </label>

                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    {...register('isFeatured')}
                                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">Featured</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/products')}
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
                            <>{isEdit ? 'Update' : 'Create'} Product</>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;