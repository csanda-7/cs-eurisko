import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '../atoms/button/button';

const userSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
  email: z.string().email('Invalid email format'),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  status: z.enum(['active', 'locked']),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserFormProps {
  onSubmit: (data: UserFormData) => void;
  defaultValues?: Partial<UserFormData>;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, defaultValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({ resolver: zodResolver(userSchema), defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
        <input
          {...register('firstName')}
          placeholder="First Name"
          className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#3251D0] dark:bg-gray-700 dark:text-white"
        />
        {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
        <input
          {...register('lastName')}
          placeholder="Last Name"
          className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#3251D0] dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
        <input
          {...register('email')}
          placeholder="Email"
          className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#3251D0] dark:bg-gray-700 dark:text-white"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
        <input
          {...register('dateOfBirth')}
          type="date"
          className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#3251D0] dark:bg-gray-700 dark:text-white"
        />
        {errors.dateOfBirth && <p className="text-red-500">{errors.dateOfBirth.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
        <select
          {...register('status')}
          className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#3251D0] dark:bg-gray-700 dark:text-white"
        >
          <option value="active">Active</option>
          <option value="locked">Locked</option>
        </select>
      </div>

      <Button type="submit" variant="primary" className="w-full">
        Submit
      </Button>
    </form>
  );
};

export default UserForm;