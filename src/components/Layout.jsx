import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../authStore";

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-gray-800 text-white p-4 shadow-md">
                <nav className="container mx-auto flex justify-between items-center">
                    {/* Left Links */}
                    <div className="space-x-6 text-lg font-semibold">
                        <Link to="/" className="hover:text-gray-300 transition-colors duration-200">
                            홈
                        </Link>
                        <Link to="/profile" className="hover:text-gray-300 transition-colors duration-200">
                            프로필
                        </Link>
                        <Link to="/test" className="hover:text-gray-300 transition-colors duration-200">
                            테스트
                        </Link>
                        <Link to="/results" className="hover:text-gray-300 transition-colors duration-200">
                            결과 보기
                        </Link>
                    </div>

                    <div className="space-x-4">
                        {user ? (
                            <>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                                >
                                    로그아웃
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                                >
                                    로그인
                                </Link>
                                <button
                                    onClick={handleSignup}
                                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                                >
                                    회원 가입
                                </button>
                            </>
                        )}
                    </div>
                </nav>
            </header>
            <main className="container mx-auto flex-grow p-8 bg-white">
                {children}
            </main>
        </div>
    );
};

export default Layout;