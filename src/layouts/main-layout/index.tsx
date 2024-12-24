import React from "react";
import { Button, Divider, Tag } from "antd";
import {
    EditOutlined,
    BarChartOutlined,
    StarOutlined,
    StarFilled,
    CopyOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { useImmer } from "use-immer";
import "antd/dist/reset.css";
import {Outlet} from "react-router-dom";


const MainLayout: React.FC = () => {
    return (<div>
        <Outlet/>
    </div>)
};

export default MainLayout;