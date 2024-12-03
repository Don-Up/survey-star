import React from "react";
import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layouts/main-layout";
import Index from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import NotFound from "../pages/404";
import ManageLayout from "../layouts/manage-layout";
import MySurveys from "../pages/survey-manage/my-surveys";
import StarSurveys from "../pages/survey-manage/star-surveys";
import RecycleBin from "../pages/survey-manage/recycle-bin";
import SurveyLayout from "../layouts/survey-layout";
import EditSurveys from "../pages/survey-details/edit-surveys";
import StatSurveys from "../pages/survey-details/stat-surveys";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {
                path: "/",
                element: <Index/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "register",
                element: <Register/>
            },
        ]
    },
    {
        path: "/manage",
        element: <ManageLayout/>,
        children: [
            {
                path: "list",
                element: <MySurveys/>
            },
            {
                path: "star",
                element: <StarSurveys/>
            },
            {
                path: "trash",
                element: <RecycleBin/>
            }
        ]
    },
    {
        path: "/survey",
        element: <SurveyLayout/>,
        children: [
            {
                path: "edit:id",
                element: <EditSurveys/>
            },
            {
                path: "stat:id",
                element: <StatSurveys/>
            }
        ]
    },
    {
        path: "*",
        element: <NotFound/>
    }
])

export default router