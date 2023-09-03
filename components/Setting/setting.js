import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useBetween } from "use-between";
import './setting.scss';
import '../laundry/laundary.scss'
import '../Start/StartUp/SignUp/SignUp.scss'
import Header from "../Header/header";


const Settings = () => {
    useEffect(() => {
        const active = document.querySelector(".settingsNav");

        Array.from(document.querySelectorAll(".navL"))
            .forEach(function (val) {
                val.style.borderBottom = "none";
                // val.style.border='none';

            });
        active.style.borderBottom = "2px solid #88c0ee";
        document.querySelector('.settings').style.display = "block"
    })
    // active.style.fontSize = '0.83rem;';

    const state = useSelector((state) => state.data);

    const { Lang, setLang, arrayLang, SelectionCountry } = useBetween(state.useShareState);
    const [notiText, setNotiText] = useState("");
    const [selected, setSelected] = useState("الرياض");
    const [openTab, setOpenTap] = useState(0);
    const [inputtext, setinputtext] = useState({
        landuName: "مغسلة الأمين",
        landuPhone: "0936292212",
        password: "",
        password1: ""
    });
    const [eye, seteye] = useState(true);
    const [password, setpassword] = useState("password");
    const [type, settype] = useState(false);
    var arrayLangu = arrayLang;

    const [eye1, seteye1] = useState(true);
    const [password1, setpassword1] = useState("password");
    const [type1, settype1] = useState(false);

    const switchTab = (index) => {

        setOpenTap(index);
    }

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

    const [lazy, setLazy] = useState(true);
    const [close1, setClose] = useState(true);
    useEffect(() => {
       
        if(!close1)
        SaveSetting()
        setLazy(!lazy)
       
        
    }, [Lang])
    const SaveSetting = () => {
        const closeNotSuccess = document.querySelector(".notSuccessSett");
        const closeSuccess = document.querySelector(".successSett");


        if (inputtext.landuPhone.length != 10 || isNaN(Number(inputtext.landuPhone)) && inputtext.landuPhone != "") {

            closeNotSuccess.style.opacity = "0.8";
            setNotiText(arrayLang.notSuccessNot1);
            setTimeout(function () { closeNotSuccess.style.display = "block"; }, 200);
        }
        else if (inputtext.password != inputtext.password1) {
            setNotiText(arrayLang.notSuccessNot2);

            closeNotSuccess.style.opacity = "0.8";
            setTimeout(function () { closeNotSuccess.style.display = "block"; }, 200);
        }
        else if (selected!="الرياض") {
            setNotiText(arrayLang.notSuccessNot3);

            closeNotSuccess.style.opacity = "0.8";
            setTimeout(function () { closeNotSuccess.style.display = "block"; }, 200);
        }
        
        else {

            closeSuccess.style.opacity = "0.8";
            setTimeout(function () { closeSuccess.style.display = "block"; }, 200);
            setNotiText("")
        }
        setClose(false)

    }
    const close = () => {
        const closeNotSuccess = document.querySelector(".notSuccessSett");
        const closeSuccess = document.querySelector(".successSett");
setClose(true)
        closeSuccess.style.opacity = "0";
        setTimeout(function () { closeSuccess.style.display = "none"; }, 550);

        closeNotSuccess.style.opacity = "0";
        setTimeout(function () { closeNotSuccess.style.display = "none"; }, 550);


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
        <div className="settings" style={{ "direction": (Lang == 'Arabic' || Lang == 'pakistani') ? 'rtl' : 'ltr' }}>
            <Header />
            <div className="notSuccessSett">
                <div className="closebtn" onClick={close}>×</div>
                <b>{notiText}</b>
                <i className="fa fa-exclamation fa-1x"></i>
            </div>
            <div className="successSett">
                <div className="closebtn " onClick={close}>×</div>
                <b>{arrayLang.successNoti}</b>
                <i className="fa fa-check fa-1"></i>
            </div>
            <div className="settings-container"  >

                <div className="left-column" >

                    <ul>
                        <li onClick={() => switchTab(0)}>
                            <i className="fa fa-lock"></i>{arrayLang.ModifyProfile}
                        </li>

                        {/* <li onClick={() => switchTab(1)}>
                        <i className="fa fa-map-marker" aria-hidden="true"></i>{arrayLangu.locTap}
                    </li> */}


                        <li onClick={() => switchTab(2)}>
                            <i className="fa fa-shield" aria-hidden="true"></i>{arrayLangu.termsTap}
                        </li>
                        <li onClick={() => switchTab(3)}>
                            <i className='fa fa-tasks'></i>{arrayLangu.workSystemTap}
                        </li>
                    </ul>

                </div>
                <div className="line"></div>
                <div className="settings-tab">
                    {openTab === 0 &&
                        <form>

                            <div className="input-group">
                                <h1> {arrayLang.name}</h1>
                                <input type="text" onChange={inputEvent} value={inputtext.landuName} name="landuName" />

                                <h1>{arrayLangu.changPass}</h1>
                                <div className="passCont">
                                    <input type={password1} value={inputtext.password1} onChange={inputEvent} name="password1" />
                                    <i onClick={Eye1} className={`fa ${eye1 ? "fa-eye-slash" : "fa-eye"}`} ></i>
                                </div>
                                <label>{arrayLangu.newPass}</label>

                                <div className="passCont">
                                    <input type={password} value={inputtext.password} onChange={inputEvent} name="password" />
                                    <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`} ></i>
                                </div>
                                <label>{arrayLangu.confNewPass}</label>
                                <h1> {arrayLang.PhoneNumber}</h1>
                                <input type="text" placeholder="0936292212" onChange={inputEvent} value={inputtext.landuPhone} name="landuPhone" />

                                <h1>{arrayLang.city}</h1>
                                <select
                                    className="SelectedBox "
                                    onChange={changeSelection}
                                    value={selected}
                                >
                                    {selectionCountry}

                                </select>
                              
                              
                            </div>


                            <div className="btn" onClick={SaveSetting}>
                                {arrayLangu.btnSav}
                            </div>
                        </form>
                    }


                    {openTab === 2 &&
                        <form>
                            <h1>{arrayLangu.termsTap}</h1>

                        </form>
                    }
                    {openTab === 3 &&
                        <form>
                            <h1>{arrayLangu.HowSystemWork}</h1>

                        </form>
                    }
                </div>
            </div>

        </div>
    );
}

export default Settings;
