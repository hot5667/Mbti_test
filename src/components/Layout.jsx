import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../authStore";

// 스타일을 처리하는 함수
const getNavLinkStyles = () => `
    relative inline-block group
    hover:text-[#ffffff] transition-colors duration-300
`;

const getHoverEffectStyles = () => `
    absolute bottom-0 left-0 w-full h-[2px] bg-[#44F697]
    scale-x-0 group-hover:scale-x-100
    transition-transform duration-300
`;

const getButtonStyles = (color) => `
    ${color}-600 hover:${color}-700
    text-white py-2 px-6 rounded-lg shadow-lg
    transition-colors duration-300 text-sm
`;

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
            <header className="bg-gradient-to-r from-blue-500 to-teal-400 text-white p-4 shadow-md">
                <nav className="container mx-auto flex justify-between items-center">
                    <div className="space-x-6 text-lg font-semibold">
                        <Link to="/" className={getNavLinkStyles(true)}>
                            홈
                            <span className={getHoverEffectStyles()}></span>
                        </Link>
                        <Link to="/profile" className={getNavLinkStyles(false)}>
                            프로필
                            <span className={getHoverEffectStyles()}></span>
                        </Link>
                        <Link to="/test" className={getNavLinkStyles(false)}>
                            테스트
                            <span className={getHoverEffectStyles()}></span>
                        </Link>
                        <Link to="/results" className={getNavLinkStyles(false)}>
                            결과 보기
                            <span className={getHoverEffectStyles()}></span>
                        </Link>
                    </div>

                    <div className="space-x-4">
                        {user ? (
                            <button
                                onClick={handleLogout}
                                className={getButtonStyles('bg-red')}
                            >
                                로그아웃
                            </button>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className={getButtonStyles('bg-blue')}
                                >
                                    로그인
                                </Link>
                                <button
                                    onClick={handleSignup}
                                    className={getButtonStyles('bg-green')}
                                >
                                    회원 가입
                                </button>
                            </>
                        )}
                    </div>
                </nav>
            </header>
            <main className="container mx-auto flex-grow p-8">
                {children}
            </main>
        </div>
    );
};

export default Layout;
