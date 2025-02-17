import React, {ChangeEvent, useEffect, useState} from "react";
import Search from "antd/es/input/Search";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {LIST_SEARCH_PARAM_KEY} from "../../constant";
import {useTranslation} from "react-i18next";

const ListSearch: React.FC = () => {
    const [value, setValue] = useState("")
    const nav = useNavigate()
    const { pathname } = useLocation()

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value)
    }

    function handleSearch(value: string) {
        nav({
            pathname,
            search: LIST_SEARCH_PARAM_KEY+"="+value
        })
    }

    const [searchParams] = useSearchParams()
    useEffect(() => {
        // Whenever searchParams changes, the function is executed.
        const newVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ""
        setValue(newVal)
    }, [searchParams]);

    const { t } = useTranslation();

    return (<Search
        placeholder={t("enter_keywords")}
        onSearch={handleSearch}
        onChange={handleChange}
        value={value}
        className={"w-[200px]"}
    />)
}

export default ListSearch