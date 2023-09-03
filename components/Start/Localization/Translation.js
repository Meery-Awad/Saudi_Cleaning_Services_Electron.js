import React from "react";
import EN from './EN';
import AR from './AR';
import OR from './OR';
import HN from './HN';


const translations = {
    EN,
    AR,
    OR,
    HN
};

const getTranslatedText = (
    key,
    locale
) => {
    const currTranslation = translations[locale] ? translations[locale] : AR;
    let translatedText  = currTranslation[key]
    ? currTranslation[key]
    : AR[key]
    ? AR[key]
    : key;

    return translatedText;
};

export { getTranslatedText };