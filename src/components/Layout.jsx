import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuthStore from "../authStore";

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login'); 
    };

    return (
        <div>
            <header>
                <nav>
                    <Link to="/">홈</Link>
                    <Link to="/profile">프로필</Link>
                    <Link to="/test">테스트</Link>
                    <Link to="/results">결과 보기</Link>
                    <div className="space-x-4">
                        {user ? (
                            <>
                            <button onClick={handleLogout}>로그아웃</button>
                            </>
                        ) : (
                            <Link to="/login">로그인</Link>
                        )}
                    </div>
                </nav>
            </header>
            <main className="container mx-auto pt-10 main">{children}</main>
        </div>
    );
};

export default Layout;