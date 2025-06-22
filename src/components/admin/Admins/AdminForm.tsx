// src/components/admin/Admins/AdminForm.tsx
import React, { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { apiClient } from '@/services/api';
import { Admin } from '@/types';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { cn } from '@/utils';

const createSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    role: yup.string().oneOf(['super_admin', 'admin', 'editor']).required('Role is required'),
    isActive: yup.boolean(),
});

const editSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').nullable(),
    role: yup.string().oneOf(['super_admin', 'admin', 'editor']).required('Role is required'),
    isActive: yup.boolean(),
});

type CreateFormData = yup.InferType<typeof createSchema>;
type EditFormData = yup.InferType<typeof editSchema>;
type FormData = CreateFormData | EditFormData;

interface AdminFormProps {
    adminId?: string | null;
    onSuccess: () => void;
    onCancel: () => void;
}

const AdminForm: React.FC<AdminFormProps> = ({
                                                 adminId,
                                                 onSuccess,
                                                 onCancel,
                                             }) => {
    const queryClient = useQueryClient();
    const [showPassword, setShowPassword] = React.useState(false);
    const isEdit = !!adminId;

    const { data: admin, isLoading: adminLoading } = useQuery({
        queryKey: ['admin', adminId],
        queryFn: async () => {
            const { data } = await apiClient.axios.get<Admin>(`/admins/${adminId}`);
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
        resolver: yupResolver(isEdit ? editSchema : createSchema),
        defaultValues: {
            isActive: true,
            role: 'admin',
        },
    });

    useEffect(() => {
        if (admin) {
            reset({
                name: admin.name,
                email: admin.email,
                password: null,
                role: admin.role,
                isActive: admin.isActive,
            });
        }
    }, [admin, reset]);

    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            const payload = { ...data };

            // Remove password if it's empty on edit
            if (isEdit && !payload.password) {
                delete (payload as any).password;
            }

            if (isEdit) {
                const { data: response } = await apiClient.axios.put(`/admins/${adminId}`, payload);
                return response;
            } else {
                const { data: response } = await apiClient.axios.post('/admins', payload);
                return response;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admins'] });
            toast.success(`Admin ${isEdit ? 'updated' : 'created'} successfully`);
            onSuccess();
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to save admin');
        },
    });

    const onSubmit = (data: FormData) => {
        mutation.mutate(data);
    };

    if (adminLoading) {
        return <LoadingSpinner />;
    }

    const roleOptions = [
        { value: 'super_admin', label: 'Super Admin', description: 'Full system access' },
        { value: 'admin', label: 'Admin', description: 'Manage content and users' },
        { value: 'editor', label: 'Editor', description: 'Manage content only' },
    ];

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
                <label className="label">
                    Password {!isEdit && '*'}
                    {isEdit && <span className="text-sm text-gray-500 ml-2">(Leave blank to keep current)</span>}
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        {...register('password')}
                        className={cn('input pr-10', errors.password && 'border-red-300')}
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                        ) : (
                            <EyeIcon className="h-5 w-5 text-gray-400" />
                        )}
                    </button>
                </div>
                {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
            </div>

            <div>
                <label className="label">Role *</label>
                <div className="space-y-2">
                    {roleOptions.map((option) => (
                        <label
                            key={option.value}
                            className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                        >
                            <input
                                type="radio"
                                {...register('role')}
                                value={option.value}
                                className="mt-1 rounded-full border-gray-300 text-primary-600 focus:ring-primary-500"
                            />
                            <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">{option.label}</div>
                                <div className="text-sm text-gray-500">{option.description}</div>
                            </div>
                        </label>
                    ))}
                </div>
                {errors.role && (
                    <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                )}
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
                        <>{isEdit ? 'Update' : 'Create'} Admin</>
                    )}
                </button>
            </div>
        </form>
    );
};

export default AdminForm;