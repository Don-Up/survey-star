import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_PATHNAME } from "../../router";
import { useRequest } from "ahooks";
import { getUserInfoService } from "../../services/user";
import {removeToken} from "../../utils/user-info";
import {useGetUserInfo} from "../../hook/useGetUserInfo";
import {useDispatch} from "react-redux";
import {logoutReducer} from "../../store/userReducer";

interface UserInfoProps {
    className?: string; // Optional className prop
}

const UserInfo: React.FC<UserInfoProps> = ({ className }) => {
    // const { data } = useRequest(getUserInfoService);
    // const { email } = data || {};
    const {email} = useGetUserInfo();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logoutReducer())
        removeToken(); // Clear the token
        navigate(LOGIN_PATHNAME); // Redirect to the login page
    };

    return (
        <div className={className}>
            {email ? (
                <>
                    <span>{email}</span>
                    <button
                        onClick={handleLogout}
                        className="ml-2 text-orange-500"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <Link to={LOGIN_PATHNAME}>Login</Link>
            )}
        </div>
    );
};

export default UserInfo;
