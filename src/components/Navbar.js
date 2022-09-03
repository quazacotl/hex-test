import {Link, NavLink} from "react-router-dom";
import {appContext} from "../App";
import {useContext} from "react";
import {toast} from "react-toastify";

const Navbar = () => {
    const {authenticated, setAuthenticated } = useContext(appContext);
    const handleLogout = () => {
        toast.warning(`Выход пользователя ${localStorage.getItem('username')}`)
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        setAuthenticated(false);
    }
    return (
        <nav className={'h-12 bg-nav-grad flex justify-between items-center px-20 shadow-nav z-10'}>
        <Link to="/"  className="text-white text-3xl focus:outline-none focus:ring">Short Links</Link>
            <div className={'flex h-full'}>
                {authenticated
                    ?
                    <button
                        className={'h-full bg-emerald-600 text-white flex items-center text-xl px-8 active:bg-emerald-700 focus:outline-none focus:ring'}
                        onClick={handleLogout}
                        aria-label={'Выход из профиля'}
                    >
                        Выход
                    </button>
                    :
                    <div className={'flex gap-4'}>
                        <NavLink
                            aria-label={'Регистрация пользователя'}
                            style={({ isActive }) => isActive ? {'background-color': '#16a34a'} : undefined}
                            to="/register"
                            className={'h-full flex items-center text-xl px-8 text-white active:bg-emerald-700 focus:outline-none focus:ring'}
                        >
                            Регистрация
                        </NavLink>
                        <NavLink
                            aria-label={'Авторизация пользователя'}
                            style={({ isActive }) => isActive ? {'background-color': '#16a34a'} : undefined}
                            to="/auth"
                            className={'h-full flex items-center text-xl px-8 text-white active:bg-emerald-700 focus:outline-none focus:ring'}
                        >
                            Авторизация
                        </NavLink>
                    </div>
                }
            </div>
        </nav>
    );
};

export default Navbar;