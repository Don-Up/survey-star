// src/hooks/useTranslationHelper.js
import { useTranslation } from 'react-i18next';

export const useTranslationHelper = () => {
    const { t } = useTranslation();
    return t;
};