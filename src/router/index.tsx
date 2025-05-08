import React, {lazy} from "react";
import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layouts/main-layout";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import NotFound from "../pages/404";
import ManageLayout from "../layouts/manage-layout";
import List from "../pages/manage/list";
import Star from "../pages/manage/star";
import Trash from "../pages/manage/trash";
import QuestionnaireLayout from "../layouts/questionnaire-layout";
// import {Edit} from "../pages/questionnaire/edit";
// import Stat from "../pages/questionnaire/stat";

const Edit = lazy(/*webpackChunkName: "editPage"*/() => import("../pages/questionnaire/edit"))
const Stat = lazy(/*webpackChunkName: "statPage"*/() => import("../pages/questionnaire/stat"))

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {
                path: "/",
                element: <Home/>
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
                element: <List/>
            },
            {
                path: "star",
                element: <Star/>
            },
            {
                path: "trash",
                element: <Trash/>
            }
        ]
    },
    {
        path: "/questionnaire",
        element: <QuestionnaireLayout/>,
        children: [
            {
                path: "edit/:id",
                element: <Edit/>
            },
            {
                path: "stat/:id",
                element: <Stat/>
            }
        ]
    },
    {
        path: "*",
        element: <NotFound/>
    }
])

export default router

export const HOME_PATHNAME = "/"
export const LOGIN_PATHNAME = "/login"
export const REGISTER_PATHNAME = "/register"
export const MANAGE_INDEX_PATHNAME = "/manage/list"