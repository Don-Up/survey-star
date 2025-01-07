import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {LOGIN_PATHNAME} from "../../router";

interface UserInfoProps {
    className?: string; // Optional className prop
}

const UserInfo: React.FC<UserInfoProps> = ({ className }) => {
    const { t } = useTranslation();

    return (
        <>
            <Link to={LOGIN_PATHNAME} className={className}>
                {t("login")}
            </Link>
        </>
    );
};

export default UserInfo;