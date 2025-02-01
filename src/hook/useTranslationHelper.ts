// src/hooks/useTranslationHelper.ts
import { useTranslation } from 'react-i18next';

export const useTranslationHelper = () => {
    const { t } = useTranslation();
    return t;
};
