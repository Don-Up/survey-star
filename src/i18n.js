// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    enter_keywords: "Enter keywords",
                    xm_questionnaire: "XM Questionnaire",
                    login: "Login",
                    // Add more translations here
                }
            },
            cn: {
                translation: {
                    enter_keywords: "输入关键字",
                    xm_questionnaire: "小木问卷",
                    login: "登录",
                    // Add more translations here
                }
            },
        },
        lng: "en", // Default language
        fallbackLng: "en", // Fallback language
        interpolation: {
            escapeValue: false, // React already escapes values
        },
    });

export default i18n;