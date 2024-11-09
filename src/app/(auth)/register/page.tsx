import React from 'react';
import SignupForm from '@/components/forms/SignUpForm';

const RegisterPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center text-gray-900">Create an Account</h1>
            <SignupForm />
            </div>
        </div>
    );
};

export default RegisterPage;