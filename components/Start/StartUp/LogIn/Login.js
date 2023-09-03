import React, { useState } from "react";
import './Login.css';
import { getTranslatedText as translate } from '../../Localization/Translation';
import { useSelector } from 'react-redux';
import { useBetween } from 'use-between';
import { NavLink } from 'react-router-dom';
import LanguageSelect from '../../LanguageSelection/LanguageSelect.js'
import google from './Pic/google.png';
import mac from './Pic/mac.png';

const Login = () => {
    const state = useSelector((state) => state.data);

    const { locale, isLogIn, setisLogIn ,arrayLang,Lang} = useBetween(state.useShareState);

    const [inputtext, setinputtext] = useState({
        phone: "",
        password: ""
    });
    const [eye, seteye] = useState(true);
    const [password, setpassword] = useState("password");
    const [type, settype] = useState(false);
    const Eye = () => {
        if (password == "password") {
            setpassword("text");
            seteye(false);
            settype(true);
        }
        else {
            setpassword("password");
            seteye(true);
            settype(false);
        }
    }
    const inputEvent = (event) => {

        const name = event.target.name;
        const value = event.target.value;
        setinputtext((lastValue) => {
            return {
                ...lastValue,
                [name]: value
            }
        });
    }
    const close = () => {
        var acc = document.querySelector(".alert1");

        acc.style.opacity = "0";
        setTimeout(function () { acc.style.display = "none"; }, 550);

    }
    const toSignUp = () => {
        document.querySelector('.Signup').classList.toggle('current-section-start')
        document.querySelector('.Login').classList.remove('current-section-start')
        document.querySelector('.copy-rights-section').classList.remove('current-section-start')
    }
    const toStartPage = () => {
        document.querySelector('.Startup-form').classList.toggle('current-section-start')
        document.querySelector('.Login').classList.remove('current-section-start')
        document.querySelector('.copy-rights-section').classList.toggle('current-section-start')
    }
    const checkLogIn = () => {
        // if (inputtext.password == "12345" && inputtext.phone == "0936292212") {
            setisLogIn(true);

        // }

        // else {

        //     const acc = document.querySelector(".alert1");

        //     acc.style.opacity = "0.8";
        //     setTimeout(function () { acc.style.display = "block"; }, 200);

        // }
    }
    return (
        <div className='Login-form' style={{ "direction": (Lang == 'Arabic' || Lang == 'pakistani') ? 'rtl' : 'ltr' }} >

            <div className='login-form-header-language'>
                <div className='Login-form-header'>{translate('login-form-header', locale)}</div>

                {/* Language Selection */}
                <LanguageSelect />
            </div>

            {/* Login Form */}
            <form className='Login-form-inputs'>
                <div className="alert alert1">
                    <div className="closebtn" onClick={close}>×</div>
                    <b>{arrayLang.notSuccessNotLogin}</b>
                    <i  className="fa fa-exclamation fa-1x"></i>
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" id="LoginPhone"
                        name="phone" value={inputtext.phone} onChange={inputEvent}
                        placeholder={arrayLang.PhoneNumber} />
                    <div id="emailHelp" className="form-text">{translate('login-phone-number-text', locale)}</div>
                </div>
                <div className="mb-3 passWord">
                    <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`} ></i>
                    <input type={password} value={inputtext.password} onChange={inputEvent} name="password" className="form-control"
                        id="LoginPassword" placeholder={translate('login-password-placeholder', locale)} />
                </div>
                <div className="endOfForm" style={{direction:"rtl"}}>

                   
                        <div className="btn btn-primary btn-login-form" onClick={checkLogIn}>{translate('login-btn-text', locale)}</div>



                    <i className="fa fa-arrow-left" aria-hidden="true" onClick={toStartPage}></i>
                </div>
            </form>

            {/* Log in With */}
            <hr />


            {/* Have No Account */}
            <div className='Login-form-no-account' >
                {translate('login-no-account-text', locale)}
                <span className='Login-form-sign-up-btn' onClick={toSignUp}>{translate('login-no-account-signup', locale)}</span>
            </div>
        </div>
    );
}

export default Login;
