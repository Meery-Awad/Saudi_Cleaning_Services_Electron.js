import React, { useEffect } from "react";
import './LanguageSelect.css';
import { getTranslatedText as translate } from '../Localization/Translation';
import { useSelector } from 'react-redux';
import { useBetween } from 'use-between';

const LanguageSelect = () => {
    const state = useSelector((state) => state.data);

    const { locale, setLocale, arrayLang, Lang, setLang } = useBetween(state.useShareState);
   
    const changeLang = (e) => {

        setLang(e.target.value)
        if(e.target.value=="Arabic")
        setLocale("AR")
        if(e.target.value=="en")
        setLocale("EN")
        if(e.target.value=="indian")
        setLocale("HN")
        if(e.target.value=="pakistani")
        setLocale("OR")

    }
    useEffect(()=>{
        if(Lang=="Arabic")
        setLocale("AR")
        if(Lang=="en")
        setLocale("EN")
        if(Lang=="indian")
        setLocale("HN")
        if(Lang=="pakistani")
        setLocale("OR")

    },[Lang])

    return (
        <div>


            <select
                className=" selectBox"
                onChange={changeLang}
                name="lang"
                value={Lang}
            >

                <option className="optionsMenu" value="Arabic" >
                    {arrayLang.arabic}
                </option>
                <option className="optionsMenu" value="en">
                    {arrayLang.en}
                </option>
                <option className="optionsMenu" value="indian">
                    {arrayLang.indian}
                </option>
                <option className="optionsMenu" value="pakistani">
                    {arrayLang.pakistani}
                </option>
            </select>



        </div>
    );
}

export default LanguageSelect;
