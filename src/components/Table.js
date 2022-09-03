import { IoIosArrowUp, IoIosArrowDown  } from "react-icons/io";
import {IconContext} from 'react-icons'
import copy from "copy-to-clipboard";
import {toast} from "react-toastify";
import {useEffect} from "react";


const Table = ({links, filters, setFilters, updateLinks}) => {

    useEffect(() => {
        updateLinks()
    }, [filters])

    // Копирование ссылки по клику на ячейку
    const copyLink = (link) => {
        copy(`http://79.143.31.216/s/${link}`)
        toast.success('Ссылка скопирована')
    }

    // Изменение состояния фильтров таблицы
    const handleFilter = (name, type) => {
        switch (name) {
            case 'shortLink':
                if (filters.shortLinkStatus === '') setFilters({...filters, shortLinkStatus: type})
                else switch(type) {
                    case 'asc_short':
                        if (filters.shortLinkStatus === 'asc_short') setFilters({...filters, shortLinkStatus: ''})
                        else setFilters({...filters, shortLinkStatus: 'asc_short'})
                        break
                    case 'desc_short':
                        if (filters.shortLinkStatus === 'desc_short') setFilters({...filters, shortLinkStatus: ''})
                        else setFilters({...filters, shortLinkStatus: 'desc_short'})
                        break
                    default: break
                }
                break
            case 'link':
                if (filters.linkStatus === '') setFilters({...filters, linkStatus: type})
                else switch(type) {
                    case 'asc_target':
                        if (filters.linkStatus === 'asc_target') setFilters({...filters, linkStatus: ''})
                        else setFilters({...filters, linkStatus: 'asc_target'})
                        break
                    case 'desc_target':
                        if (filters.linkStatus === 'desc_target') setFilters({...filters, linkStatus: ''})
                        else setFilters({...filters, linkStatus: 'desc_target'})
                        break
                    default: break
                }
                break
            case 'count':
                if (filters.countStatus === '') setFilters({...filters, countStatus: type})
                else switch(type) {
                    case 'asc_counter':
                        if (filters.countStatus === 'asc_counter') setFilters({...filters, countStatus: ''})
                        else setFilters({...filters, countStatus: 'asc_counter'})
                        break
                    case 'desc_counter':
                        if (filters.countStatus === 'desc_counter') setFilters({...filters, countStatus: ''})
                        else setFilters({...filters, countStatus: 'desc_counter'})
                        break
                    default: break
                }
                break
            default: break
        }
    }
    

    return (
        <>
            <table className={'w-[950px] mt-10 border-collapse rounded-lg bg-white table-fixed overflow-hidden'}>
                <thead className={'bg-purple-400'}>
                <tr className={''}>
                    <th className={'w-[250px] border-r border-gray-600 font-medium'}>Короткая ссылка</th>
                    <th className={'w-[550px] border-r border-gray-600 font-medium'}>Исходная ссылка</th>
                    <th className={'w-[150px] font-medium'}>Количество переходов</th>
                </tr>
                </thead>
                <tbody>
                    <tr className={'bg-gray-300 w-full'}>
                        <td className={'px-2 py-1 border '}>
                            <div className={'w-full h-full flex gap-4 justify-center items-center'}>
                                <div>Фильтр</div>
                                <div className={'flex flex-col'}>
                                    <IconContext.Provider value={{ className: filters.shortLinkStatus === 'asc_short' ? "text-black" : 'text-gray-600/50' }}>
                                        <div className={'cursor-pointer'} onClick={() => handleFilter('shortLink', 'asc_short')}>
                                            <IoIosArrowUp/>
                                        </div>
                                    </IconContext.Provider>
                                    <IconContext.Provider value={{ className: filters.shortLinkStatus === 'desc_short' ? "text-black" : 'text-gray-600/50' }}>
                                        <div className={'cursor-pointer'} onClick={() => handleFilter('shortLink', 'desc_short')}>
                                            <IoIosArrowDown/>
                                        </div>
                                    </IconContext.Provider>
                                </div>
                            </div>
                        </td>
                        <td className={'px-2 py-1 border'}>
                            <div className={'w-full h-full flex gap-4 justify-center items-center'}>
                                <div>Фильтр</div>
                                <div className={'flex flex-col'}>
                                    <IconContext.Provider value={{ className: filters.linkStatus === 'asc_target' ? "text-black" : 'text-gray-600/50' }}>
                                        <div className={'cursor-pointer'} onClick={() => handleFilter('link', 'asc_target')}>
                                            <IoIosArrowUp/>
                                        </div>
                                    </IconContext.Provider>
                                    <IconContext.Provider value={{ className: filters.linkStatus === 'desc_target' ? "text-black" : 'text-gray-600/50' }}>
                                        <div className={'cursor-pointer'} onClick={() => handleFilter('link', 'desc_target')}>
                                            <IoIosArrowDown/>
                                        </div>
                                    </IconContext.Provider>
                                </div>
                            </div>
                        </td>
                        <td className={'px-2 py-1 border'}>
                            <div className={'w-full h-full flex gap-4 justify-center items-center'}>
                                <div>Фильтр</div>
                                <div className={'flex flex-col'}>
                                    <IconContext.Provider value={{ className: filters.countStatus === 'asc_counter' ? "text-black" : 'text-gray-600/50' }}>
                                        <div className={'cursor-pointer'} onClick={() => handleFilter('count', 'asc_counter')}>
                                            <IoIosArrowUp/>
                                        </div>
                                    </IconContext.Provider>
                                    <IconContext.Provider value={{ className: filters.countStatus === 'desc_counter' ? "text-black" : 'text-gray-600/50' }}>
                                        <div className={'cursor-pointer'} onClick={() => handleFilter('count', 'desc_counter')}>
                                            <IoIosArrowDown/>
                                        </div>
                                    </IconContext.Provider>
                                </div>
                            </div>
                        </td>
                    </tr>
                {links.map(item => {
                    return (
                        <tr key={item.id} className={'odd:bg-gray-100'}>
                            <td className={'px-2 py-1 border text-center cursor-pointer input-result'} onClick={(e) => copyLink(e.target.innerText)}>{item.short}</td>
                            <td className={'px-2 py-1 border line-clamp-1'}>{item.target}</td>
                            <td className={'px-2 py-1 border text-center'}>{item.counter}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    );
};

export default Table;