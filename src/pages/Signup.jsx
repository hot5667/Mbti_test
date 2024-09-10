import React, {useState} from "react";
import { register } from "../api/auth";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const navigate = useNavigate();

    const handleSignup = async (formData , e) => {
        try {
            console.log('폼 데이터 :', formData);
            const response  = await register(formData);
            navigate('/login');
            console.log('회원 가입 성공' ,response);
        }catch (error) {
            console.error('회원가입 실패',error);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border border-gray-300 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">회원 가입</h1>
            <AuthForm mode = 'signup' onSubmit={handleSignup}/>
        </div>
    )
}

export default SignupPage;