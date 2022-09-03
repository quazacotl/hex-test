import Navbar from "../components/Navbar";
import {useContext, useEffect, useState} from "react";
import {appContext} from "../App";
import {Link} from "react-router-dom";
import Table from "../components/Table";
import {getLinksQuantity, getStatistics} from "../http/http";
import ReactPaginate from 'react-paginate';
import ShortLinkForm from "../components/ShortLinkForm";

const MainPge = () => {
    const {authenticated} = useContext(appContext);
    const [links, setLinks] = useState(null)
    const [linksQuantity, setLinksQuantity] = useState(0)
    const [limit] = useState(10)
    const [offset, setOffset] = useState(0)
    const [filters, setFilters] = useState({
        shortLinkStatus: '',
        linkStatus: '',
        countStatus: ''
        }
    )


    // Преобразование объекта с фильтрами в массив без пустых строк
    const getArrayFilters = filtersObj => {
        return Array.from(Object.values(filtersObj)).filter(item => !!item)
    }

    // Обновление тыблицы ссылок
    const updateLinks = async () => {
        getLinksQuantity()
            .then(res => setLinksQuantity(res)
            )
            .then(() => getStatistics(limit, offset, getArrayFilters(filters)))
            .then(res => setLinks(res))
    }

    // Первоналальная проверка автоизации пользователя
    useEffect(() => {
        if (authenticated) {
            updateLinks()
        }
    }, [authenticated])


    // Обновление таблицы после смены страницы пагинации
    const onPageChange =async ({selected}) => {
        await setOffset(selected * 10)
        const res = await getStatistics(limit, selected * 10, getArrayFilters(filters))
        await setLinks(res)
    }

    return (
        <>
            <Navbar/>
            <div className={'flex flex-col items-center grow bg-spray bg-main-grad'}>
                {!authenticated
                    ?
                <div className={'mt-32 text-3xl text-slate-700 text-center'}>Ресурс сокращения ссылок.  <br/><Link className={'text-3xl text-blue-600 underline'} to={'/auth'}>Войдите</Link>, чтобы получить доступ к функционалу.</div>
                    :
                    <>
                        <ShortLinkForm updateLinks={updateLinks}/>
                        {links &&
                            <>
                                <Table links={links} filters={filters} setFilters={setFilters} updateLinks={updateLinks}/>
                                <ReactPaginate
                                    pageCount={Math.ceil(linksQuantity/10)}
                                    breakLabel="..."
                                    nextLabel=">"
                                    initialPage={0}
                                    onPageChange={(page) => onPageChange(page)}
                                    pageRangeDisplayed={3}
                                    previousLabel="<"
                                    renderOnZeroPageCount={null}
                                    containerClassName={'flex gap-2 my-4'}
                                    activeClassName={'scale-110 shadow shadow-pink-400'}
                                    pageClassName={'rounded w-6 border border-pink-300 text-center bg-white text-stone-700'}
                                    pageLinkClassName={'w-full h-full block'}
                                    nextLinkClassName={'w-full h-full block'}
                                    previousLinkClassName={'w-full h-full block'}
                                    previousClassName={'w-5 rounded border border-pink-300 text-center bg-white text-stone-700'}
                                    nextClassName={'w-5 rounded border border-pink-300 text-center bg-white text-stone-700'}
                                />
                            </>}
                    </>
                }
            </div>
        </>
    );
};

export default MainPge;