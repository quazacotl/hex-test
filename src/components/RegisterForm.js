import {useState} from "react";
import {register} from "../http/http";
import {toast} from "react-toastify";

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Регистрация пользователя
    const submitForm = async (e) => {
        e.preventDefault()
        try {
            await register(username, password)
            setUsername('')
            setPassword('')
            toast.success(`Пользователь ${username} успешно зарегистрирован`)
        }
        catch (e) {
            console.log(e)
            toast.error(`Ошибка влидации формы`)
        }
    }

    return (
        <div className={'flex justify-center items-center grow bg-spray bg-main-grad'}>
            <form onSubmit={submitForm} className={'w-[450px] p-6 rounded bg-blue-400 flex flex-col'}>
            <h3 className={'text-3xl text-white'}>Регистрация пользователя</h3>
            <label className={'text-md mt-10'} htmlFor="name">Имя пользователя</label>
            <input
                type="text"
                name="username"
                id="name"
                value={username}
                onInput={(e) => setUsername(e.target.value)}
                className={'h-10 rounded bg-white mt-2 px-2 text-xl focus:outline-none shadow-md shadow-blue-500 focus:ring ring-amber-200'}
                placeholder={'введите имя'}/>
            <label className={'text-md mt-2'} htmlFor="password">Пароль</label>
            <input
                type="text"
                name="password"
                id="password"
                value={password}
                onInput={(e) => setPassword(e.target.value)}
                className={'h-10 rounded bg-white mt-2 px-2 text-xl focus:outline-none shadow-md shadow-blue-500 focus:ring ring-amber-200 '}
                placeholder={'введите пароль'}/>
            <button
                aria-label={'Зарегистрировать пользователя'}
                type={'submit'}
                className={'py-2 px-4 mt-6 bg-green-500 rounded max-w-max mx-auto shadow-md shadow-blue-500 active:shadow-none active:bg-green-400'}
            >
                Зарегистрироваться
            </button>
        </form>
        </div>
    );
};

export default RegisterForm;