import React, {useState} from "react";
import {useRequest} from "ahooks";
import {getQuestionnaireStatListService} from "../../../services/stat";
import {useParams} from "react-router-dom";
import {Pagination, Spin, Table, Typography} from "antd";
import useGetComponentInfo from "../../../hook/useGetComponentInfo";

type PropsType = {
    selectedComponentId: string
    setSelectedComponentId: (id: string) => void
    setSelectedComponentType: (type: string) => void
}

interface StatData {
    list: any[],
    pagination: {
        page: number,
        pageSize: number,
        total: number
    }
}

const PageStat: React.FC<PropsType> = (props: PropsType) => {
    const {selectedComponentId, setSelectedComponentId, setSelectedComponentType} = props
    const {id = ""} = useParams()

    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [list, setList] = useState<any[]>([])

    const {loading} = useRequest(async () => {
        const res = await getQuestionnaireStatListService(id, {page, pageSize})
        return res as StatData
    }, {
        onSuccess(res) {
            setList(res.list.map((item, index) => {
                return {
                    ...item,
                    key: index
                }
            }))
            setPage(res.pagination.page)
            setPageSize(res.pagination.pageSize)
            setTotal(res.pagination.total)
        },
        refreshDeps: [page, pageSize]
    })

    const {components} = useGetComponentInfo()

    function handleClickTitle(uuid: string, type: string) {
        setSelectedComponentId(uuid)
        setSelectedComponentType(type)
    }


    const columns = components.map(c => {
        const {uuid, title, props = {}, type} = c
        const colTitle = props.title || title

        return {
            title: (<div
                className={"cursor-pointer"}
                onClick={() => handleClickTitle(uuid, type)}>
                <span className={uuid === selectedComponentId ? "text-blue-500" : ""}>
                    {colTitle}
                </span>
            </div>),
            dataIndex: uuid,
        }
    })

    const TableElem = <>
        <Table
            columns={columns}
            dataSource={list}
            pagination={false}/>
        <Pagination
            current={page}
            pageSize={pageSize}
            total={total}
            onChange={(page, pageSize) => {
                setPage(page)
            }}
            onShowSizeChange={(current, pageSize) => {
                setPage(page)
                setPageSize(pageSize)
            }}
        />
    </>

    return (<div>
        <Typography.Title level={4}>Questionnaire Count: {!loading && total}</Typography.Title>
        {loading && <div className={"text-center mt-20"}><Spin/></div>}
        {!loading && TableElem}
    </div>)
}

export default PageStat