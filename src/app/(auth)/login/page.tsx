import React from 'react';
import LoginForm from '@/components/forms/LoginForm';
import SocialLogin from '@/components/forms/SocialLoginForm';
import { Separator } from '@/components/ui/separator';
import { Avatar } from '@radix-ui/react-avatar';

const LoginPage: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl space-y-4">
                <div className="flex flex-col items-center mb-2">
                    <img src="/" alt="Logo" className="w-16 h-16" />
                    <h2 className="text-xl font-bold text-center text-gray-800">Login to Your Account</h2>
                    <p className="text-sm text-gray-700 mt-1 text-center">Please enter your credentials to continue</p>
                </div>
                <LoginForm />
                <div className="text-center space-y-2">
                    <Separator />
                    <h3 className="text-sm text-gray-700">Or continue with</h3>
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
