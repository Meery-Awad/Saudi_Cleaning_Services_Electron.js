import React, { useEffect, useState } from "react";
import './SignUp.css';
import { getTranslatedText as translate } from '../../Localization/Translation';
import { useSelector } from 'react-redux';
import { useBetween } from 'use-between';
import LanguageSelect from '../../LanguageSelection/LanguageSelect.js';
import google from './Pic/google.png';
import mac from './Pic/mac.png';
import { NavLink } from "react-router-dom";


function SignUp() {
    const state = useSelector((state) => state.data);
    const { Lang, SelectionCountry, arrayLang } = useBetween(state.useShareState);
    const [notiText, setNotiText] = useState("");
    const [selected, setSelected] = useState("");
    const [lazy, setLazy] = useState(true);
    const [close1, setCLOSE] = useState(true);
    
    useEffect(() => {
       if(close1==false)
        createAccount()

        setLazy(!lazy)
        
    }, [Lang])

    const [inputtext, setinputtext] = useState({
        landuName: "",
        landuPhone: "",
        password: "",
        password1: ""
    });

    const toLogIn = () => {
        document.querySelector('.Login').classList.toggle('current-section-start')
        document.querySelector('.Signup').classList.remove('current-section-start')
        document.querySelector('.copy-rights-section').classList.remove('current-section-start')
        const acc = document.querySelector(".alert");
        acc.style.display = "none";
    }

    const createAccount = () => {
        const closeNotSuccess = document.querySelector(".notSuccess");
        const closeSuccess = document.querySelector(".success");


        if (inputtext.landuPhone == "" || inputtext.landuName == "" || inputtext.password == "" || inputtext.password1 == "") {
            setNotiText(arrayLang.AllFieldNeed);
            closeNotSuccess.style.opacity = "0.8";
            setTimeout(function () { closeNotSuccess.style.display = "block"; }, 200);


        }

        else if (inputtext.landuPhone.length != 10 || isNaN(Number(inputtext.landuPhone))) {

            closeNotSuccess.style.opacity = "0.8";
            setNotiText(arrayLang.notSuccessNot1);
            setTimeout(function () { closeNotSuccess.style.display = "block"; }, 200);
            
        }
        else if (inputtext.password != inputtext.password1) {
            setNotiText(arrayLang.notSuccessNot2);

            closeNotSuccess.style.opacity = "0.8";
            setTimeout(function () { closeNotSuccess.style.display = "block"; }, 200);
            
        }
        else {

            closeSuccess.style.opacity = "0.8";
            setTimeout(function () { closeSuccess.style.display = "block"; }, 200);
            setNotiText("")
        }
        setCLOSE(false)
    }
    const close = () => {
        const closeNotSuccess = document.querySelector(".notSuccess");
        const closeSuccess = document.querySelector(".success");
        setCLOSE(true);
        closeSuccess.style.opacity = "0";
        setTimeout(function () { closeSuccess.style.display = "none"; }, 550);

        closeNotSuccess.style.opacity = "0";
        setTimeout(function () { closeNotSuccess.style.display = "none"; }, 550);
        if (notiText == "") {
            setinputtext(() => {
                return {
                    landuName: "",
                    landuPhone: "",
                    password: "",
                    password1: ""

                }
            })
        }



    }
    const { locale } = useBetween(state.useShareState);

    const [eye, seteye] = useState(true);
    const [password, setpassword] = useState("password");
    const [type, settype] = useState(false);

    const [eye1, seteye1] = useState(true);
    const [password1, setpassword1] = useState("password");
    const [type1, settype1] = useState(false);
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

    const Eye1 = () => {
        if (password1 == "password") {
            setpassword1("text");
            seteye1(false);
            settype1(true);
        }
        else {
            setpassword1("password");
            seteye1(true);
            settype1(false);
        }
    }
    const changeSelection = (e) => {
        setSelected(e.target.value);

    }
    const selectionCountry = SelectionCountry.map((item, i) => {

        return (

            <option className="optionsMenu" value={item.name} >
                {item.name}
            </option>


        )
    })
    return (
        <div className='SignUp-form' style={{ "direction": (Lang == 'Arabic' || Lang == 'pakistani') ? 'rtl' : 'ltr' }}>
            <div className='signup-form-header-language'>
                <div className='SignUp-form-header'>{translate('signup-form-header', locale)}</div>
                {/* Language Selection */}
                <LanguageSelect />
            </div>
            <div className="notSuccess">
                <div className="closebtn" onClick={close}>×</div>
                <b className="textAlert">{notiText}</b>
                <i className="fa fa-exclamation fa-1x"></i>
            </div>
            <div className="success">
                <div className="closebtn " onClick={close}>×</div>
                <b>{arrayLang.SiginUpSuccess}</b>
                <i className="fa fa-check fa-1"></i>
            </div>
            <form className='SignUp-form-inputs'>

                <div className="mb-3">
                    <input type="text" className="form-control" id="signup-phone"
                        placeholder={arrayLang.LaundNameSignUp} name="landuName" value={inputtext.landuName} onChange={inputEvent} />
                    <div id="phoneHelp" className="form-text">{arrayLang.LableLandName}</div>
                </div>
                <div className="mb-3">

                    <input type="text" className="form-control" id="signup-phone" placeholder={arrayLang.PhoneNumber}
                        name="landuPhone" value={inputtext.landuPhone} onChange={inputEvent} />
                    <div id="phoneHelp" className="form-text">{arrayLang.LablePhoneNumber}</div>
                </div>

                <div className="mb-3">
                    <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`} ></i>
                    <input type={password} className="form-control" id="signup-pass" value={inputtext.password} onChange={inputEvent} name="password" placeholder={translate('signup-password-placeholder', locale)} />

                </div>

                <div className="mb-3">
                    <i onClick={Eye1} className={`fa ${eye1 ? "fa-eye-slash" : "fa-eye"}`} ></i>
                    <input type={password1} className="form-control" value={inputtext.password1} onChange={inputEvent} name="password1" placeholder={arrayLang.confirmPassWord} />

                </div> <div className="mb-3 ">

                    <select
                        className="SelectedBox "
                        onChange={changeSelection}
                        value={selected}
                    >
                        {selectionCountry}

                    </select>
                    <div id="phoneHelp" className="form-text">{arrayLang.selectCity}</div>
                </div>
                <div className="endOfForm" style={{ direction: "rtl" }}>

                    <div className="btn btn-primary btn-SignUp-form" onClick={createAccount} >{translate('signup-btn-text', locale)}</div>
                    <span className="fa fa-arrow-left" aria-hidden="true" onClick={toLogIn}></span>

                </div>
            </form>


        </div>
    );
}

export default SignUp;
