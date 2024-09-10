import { register } from "../api/auth";
import AuthForm from "../components/AuthForm";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
    const navigate = useNavigate();

    const handleSignup = async (formData, e) => {
        try {
            console.log('폼 데이터 :', formData);
            const response = await register(formData);
            navigate('/login');
            console.log('회원 가입 성공', response);
        } catch (error) {
            console.error('회원가입 실패', error);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">회원 가입</h1>
            <AuthForm mode='signup' onSubmit={handleSignup} />
            <div className="mt-4 text-center">
                <p className="text-gray-600">
                    이미 계정이 있으신가요?{" "}
                    <Link to="/login" className="text-blue-500 hover:text-blue-700 font-semibold">
                        로그인
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignupPage;