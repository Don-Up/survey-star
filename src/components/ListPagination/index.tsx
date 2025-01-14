import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {Pagination} from "antd";

type ListPaginationProps = {
    total: number
}

const ListPagination: React.FC<ListPaginationProps> = ({ total}) => {
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const [searchParams] = useSearchParams()

    useEffect(() => {
        const page = parseInt(searchParams.get('page') || '1')
        setCurrent(page)
        const pageSize = parseInt(searchParams.get('pageSize') || '10')
        setPageSize(pageSize)
    },  [searchParams])

    const nav = useNavigate()
    const {pathname} = useLocation()
    function handlePageChange(page: number, pageSize: number){
        searchParams.set('page', page.toString())
        searchParams.set('pageSize', pageSize.toString())
        nav({
            pathname,
            search: searchParams.toString()
        })
    }

    return (<Pagination current={current} pageSize={pageSize} total={total} onChange={handlePageChange}/>)
}

export default ListPagination