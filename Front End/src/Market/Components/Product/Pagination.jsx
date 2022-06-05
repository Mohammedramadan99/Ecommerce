import React, { useState,useEffect } from 'react'

export default function Pagination({currentPage,totalProducts,productsPerPage,paginate}) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage) ; i++) {
        pageNumbers.push(i)
    }

    const [activeNum,setActiveNum] = useState(1)
    const paginateHandler = (number) => {
        paginate(number)
        setActiveNum(number)
    }
    // useEffect(() => {
    //     setActiveNum(currentPage)
    // }, [currentPage])
    
    return (
        <div className='pagination'>
            {pageNumbers.map(number => (
                <li key={number} >
                    <a href="#" className={activeNum === number ? 'active' : ''} onClick={(e) => paginateHandler(number)}>
                        {number}
                    </a>
                </li>
            ))}
        </div>
    )
}