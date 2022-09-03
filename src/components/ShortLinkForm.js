import {useState} from "react";
import {squeeze} from "../http/http";
import {toast} from "react-toastify";
import copy from "copy-to-clipboard";

const ShortLinkForm = ({updateLinks}) => {
    const [inputLink, setInputLink] = useState('')
    const [inputResult, setInputResult] = useState('')

    // Копирование ссылки из инпута после сокращения
    const copyResult = (result) => {
        if (result) {
            copy(result)
            toast.success('Ссылка скопирована')
        }
    }

    // Сокращение ссылки из инпута по нажатию кнопки
    const submitForm = async(event) => {
        event.preventDefault()
        if (inputLink) {
            try {
                const result = await squeeze(inputLink)
                setInputResult(`http://79.143.31.216/s/${result.short}`)
                await updateLinks()
            }
            catch (e) {
                toast.warning('Неверный запрос')
            }
        }
    }

    return (
        <form className={'flex flex-col gap-8 py-4 px-8 mt-10 rounded bg-purple-400 shadow-md shadow-teal-200'}
              onSubmit={submitForm}
        >
            <div className={'flex gap-4'}>
                <input
                    className={'h-10 w-96 px-4 rounded shadow-md shadow-purple-600 focus:outline-none focus:ring ring-amber-200'}
                    placeholder={'вставьте ссылку'}
                    type="text"
                    name={'link'}
                    value={inputLink}
                    onChange={(e) => setInputLink(e.target.value)}
                />
                <button
                    aria-label={'Сократить ссылку'}
                    type={'submit'}
                    className={'h-10 w-32 px-4 bg-green-300 rounded shadow-md shadow-purple-600 focus:outline-none focus:ring ring-amber-200 active:shadow-none active:bg-green-400'}
                >
                    Сократить
                </button>
            </div>
            <div className={'flex gap-4'}>
                <input
                    className={'relative text-sm bg-gray-200 h-8 w-full px-4 rounded shadow-md shadow-purple-600 focus:outline-none input-result cursor-pointer'}
                    type="text"
                    value={inputResult}
                    readOnly
                    placeholder={'результат'}
                    onClick={() => copyResult(inputResult)}
                />
            </div>
        </form>
    );
};

export default ShortLinkForm;