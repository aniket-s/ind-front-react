// src/components/admin/Menus/MenuForm.tsx
import React, { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {Resolver, useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { apiClient } from '@/services/api';
import { Menu } from '@/types';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import toast from 'react-hot-toast';
import { cn } from '@/utils';

const schema = yup.object({
    title: yup.string().required('Title is required'),
    url: yup.string().when('type', {
        is: (type: string) => type !== 'dropdown',
        then: (schema) => schema.required('URL is required'),
    }),
    type: yup.string().oneOf(['internal', 'external', 'dropdown']).required(),
    parentId: yup.string().nullable(),
    icon: yup.string(),
    target: yup.string().oneOf(['_self', '_blank']).required(),
    position: yup.string().oneOf(['header', 'footer', 'both']).required(),
    isActive: yup.boolean(),
    sortOrder: yup.number(),
});

type FormData = yup.InferType<typeof schema>;

interface MenuFormProps {
    menuId?: string | null;
    onSuccess: () => void;
    onCancel: () => void;
}

const MenuForm: React.FC<MenuFormProps> = ({
                                               menuId,
                                               onSuccess,
                                               onCancel,
                                           }) => {
    const queryClient = useQueryClient();
    const isEdit = !!menuId;

    const { data: menu, isLoading: menuLoading } = useQuery({
        queryKey: ['menu', menuId],
        queryFn: async () => {
            const { data } = await apiClient.axios.get<Menu>(`/menus/${menuId}`);
            return data;
        },
        enabled: isEdit,
    });

    const { data: allMenus } = useQuery({
        queryKey: ['menus'],
        queryFn: async () => {
            const { data } = await apiClient.axios.get<Menu[]>('/menus');
            return data;
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<FormData>({
        resolver: yupResolver(schema) as never as Resolver<FormData>,
        defaultValues: {
            type: 'internal',
            target: '_self',
            position: 'header',
            isActive: true,
            sortOrder: 0,
        },
    });

    const menuType = watch('type');

    useEffect(() => {
        if (menu) {
            reset({
                title: menu.title,
                url: menu.url || '',
                type: menu.type,
                parentId: menu.parentId || null,
                icon: menu.icon || '',
                target: menu.target,
                position: menu.position,
                isActive: menu.isActive,
                sortOrder: menu.sortOrder,
            });
        }
    }, [menu, reset]);

    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            if (isEdit) {
                const { data: response } = await apiClient.axios.put(`/menus/${menuId}`, data);
                return response;
            } else {
                const { data: response } = await apiClient.axios.post('/menus', data);
                return response;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menus'] });
            queryClient.invalidateQueries({ queryKey: ['menu-tree'] });
            toast.success(`Menu ${isEdit ? 'updated' : 'created'} successfully`);
            onSuccess();
        },
    });

    const onSubmit = (data: FormData) => {
        mutation.mutate(data);
    };

    if (menuLoading) {
        return <LoadingSpinner />;
    }

    // Filter out current menu and its children for parent selection
    const availableParents = allMenus?.filter(m => {
        if (m.id === menuId) return false;
        // TODO: Also filter out children of current menu
        return true;
    }) || [];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                <label className="label">Type *</label>
                <select
                    {...register('type')}
                    className="input"
                >
                    <option value="internal">Internal Link</option>
                    <option value="external">External Link</option>
                    <option value="dropdown">Dropdown Menu</option>
                </select>
            </div>

            {menuType !== 'dropdown' && (
                <div>
                    <label className="label">URL *</label>
                    <input
                        type="text"
                        {...register('url')}
                        className={cn('input', errors.url && 'border-red-300')}
                        placeholder={menuType === 'internal' ? '/products' : 'https://example.com'}
                    />
                    {errors.url && (
                        <p className="mt-1 text-sm text-red-600">{errors.url.message}</p>
                    )}
                </div>
            )}

            <div>
                <label className="label">Parent Menu</label>
                <select {...register('parentId')} className="input">
                    <option value="">None (Top Level)</option>
                    {availableParents.map((parent) => (
                        <option key={parent.id} value={parent.id}>
                            {parent.title}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="label">Position *</label>
                    <select
                        {...register('position')}
                        className="input"
                    >
                        <option value="header">Header</option>
                        <option value="footer">Footer</option>
                        <option value="both">Both</option>
                    </select>
                </div>

                <div>
                    <label className="label">Target</label>
                    <select
                        {...register('target')}
                        className="input"
                    >
                        <option value="_self">Same Window</option>
                        <option value="_blank">New Window</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="label">Icon (Optional)</label>
                    <input
                        type="text"
                        {...register('icon')}
                        className="input"
                        placeholder="Icon name or class"
                    />
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
                        <>{isEdit ? 'Update' : 'Create'} Menu</>
                    )}
                </button>
            </div>
        </form>
    );
};

export default MenuForm;