'use client';

import { Button } from "@/components/ui/button";
import * as Icons from "react-icons/fa6"

const SocialLoginForm: React.FC = () => {
    return (
        <div className="flex space-x-4">
            <Button variant="outline" className="w-full">
                <Icons.FaGoogle
                    size={48}
                />
                Google
            </Button>
            <Button variant="outline" className="w-full">
                <Icons.FaApple size={48} />
                Apple
            </Button>
        </div>
    );
};

export default SocialLoginForm;