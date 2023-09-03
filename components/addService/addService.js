import React, { useEffect, useState } from "react";
import Header from "../Header/header";
import '../Start/StartUp/LogIn/Login.scss'
import './addService.scss'

import { useSelector } from "react-redux";
import { useBetween } from 'use-between';

const AddService = () => {
    const state = useSelector((state) => state.data);

    const { Lang, setLang, arrayLang, NewLandServi, setLanduServi, ModelAddSERVI, setModelAddSERVI, service, setService, } = useBetween(state.useShareState);
    const [SIZE, setSIZE] = useState("");
    const [notSuccess, setNotSuccess] = useState(false)
    const [notSuccess1, setNotSuccess1] = useState(false)
    const [addServ, setAddServ] = useState([{}])
    const [priceService, setpriceService] = useState([""])
    const [NewService, setNewService] = useState([""])
    const [inputtext, setinputtext] = useState({
        WidgetType: "",

    });
    const [lazy, setLazy] = useState(false)
    useEffect(() => {

        if (lazy)
            checkFromAddServi();
        setLazy(true)

    }, [NewLandServi])


    const checkFromAddServi = () => {
        setNotSuccess(false);
        var num=0;
        addServ.map((item, i) => {

            if (priceService[i] == "" || NewService[i] == "" || inputtext.WidgetType == ""
                || (!(Number(priceService[i]) == priceService[i] && priceService[i] % 1 == 0) &&
                    !(Number(priceService[i]) == priceService[i] && priceService[i] % 1 != 0))) {

                setNotSuccess(true);
            }
            else {
               num++;
            }

        })

    

        if (num==addServ.length) {
            var size1;
            if (SIZE == "خفيفة" || SIZE == "light" || SIZE == "रोशनी" || SIZE == "روشنی") {
                size1 = "خفيفة"
            }
            else
                size1 = "ثقيلة"
        //  backend

            setNotSuccess1(false);
            setLanduServi(false);
            setModelAddSERVI(false);

        }


    };
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
    const updateFieldChanged = index => e => {
        if (e.target.name == "NewService") {
            let newArr = [...NewService]; // copying the old datas array

            newArr[index] = e.target.value; // replace e.target.value with whatever you want to change it to

            setNewService(newArr);
        }
        else {
            let newArr1 = [...priceService]; // copying the old datas array

            newArr1[index] = e.target.value; // replace e.target.value with whatever you want to change it to

            setpriceService(newArr1);
        }
    }
    const changeSIZE = (e) => {
        setSIZE(e.target.value);

    }
    const removeItem = (index) => {

        setAddServ(addServ.filter((item, i) => i !== index))
        setNewService(NewService.filter((item, i) => i !== index))
        setpriceService(priceService.filter((item, i) => i !== index))
    }


    const AddItem = () => {
        var isINT = true;
        var isFLOAt = true;
        if (addServ.length != 0) {
            var LastItem = addServ.length - 1
            var n = priceService[LastItem];

            isINT = Number(n) == n && n % 1 == 0;
            isFLOAt = Number(n) == n && n % 1 != 0;

        }
        if (isINT == false && isFLOAt == false) {
            setNotSuccess1(true)
        }
        else {
            setAddServ(oldArray => [...oldArray, {}]);
            setpriceService(oldArray => [...oldArray, ""]);
            setNewService(oldArray => [...oldArray, ""]);

        }
    }
    const array =
        addServ.map((item, i) => {
            return (
                <div className="list" id="list">
                    <div className="list-item">

                        <div>
                            <p>{arrayLang.Service}</p>
                            <input
                                type="text" className="NewService" value={NewService[i]}
                                onChange={updateFieldChanged(i)} name="NewService"

                            >

                            </input>
                        </div>
                        <div className="pricService">
                            <p>{arrayLang.ServicePrice}</p>
                            <input
                                type="text" className="priceService"
                                placeholder="0.0" value={priceService[i]} onChange={updateFieldChanged(i)}
                                name="priceService">

                            </input>
                        </div>
                        <div>
                            {/* <p></p> */}
                            <br />
                            <i className="fa fa-trash" aria-hidden="true" onClick={() => removeItem(i)} title={arrayLang.DeleteServi}></i>
                        </div>

                    </div>
                </div>

            )
        })




    return (
        <div>

            <div className="addServiceCont" style={{ "direction": (Lang == 'Arabic' || Lang == 'pakistani') ? 'rtl' : 'ltr' }} >
                {notSuccess &&
                    <div className="notSuccessADDServi2">
                        <div className="closebtn" onClick={() => setNotSuccess(false)}>×</div>
                        <b> {arrayLang.AllFieldNeed}</b>
                        <i className="fa fa-exclamation fa-1x" style={{ color: "#f44336" }}></i>
                    </div>
                }
                {notSuccess1 &&
                    <div className="notSuccessADDServi2">
                        <div className="closebtn" onClick={() => setNotSuccess1(false)}>×</div>
                        <b> {arrayLang.PrcieNoti}</b>
                        <i className="fa fa-exclamation fa-1x" style={{ color: "#f44336" }}></i>
                    </div>
                }
                <div className="label">{arrayLang.WidgetType}</div>
                <input type="text" value={inputtext.WidgetType} onChange={inputEvent} name="WidgetType" ></input>
                <div className="label">{arrayLang.WidgetSize}</div>
                <select
                    className="selectBox1"
                    onChange={changeSIZE}
                    value={SIZE}
                >

                    <option className="optionsMenu" value="small" >
                        {arrayLang.WidgetSize1}
                    </option>
                    <option className="optionsMenu" value="big">
                        {arrayLang.WidgetSize2}
                    </option>

                </select>
                <div className="label">{arrayLang.ServicesProvided}</div>
                {array}

                <div className="AddServiceBtn" id="AddServiceBtn" onClick={AddItem}>
                    <i className="fa fa-plus" aria-hidden="true" ></i> <span>{arrayLang.AddService}</span>
                </div>
                {/* <div className="BTN">
                        <div className="AddBTN">
                            اضافة
                        </div>
                        <div className="CloseBTN">
                            اغلاق
                        </div>

                    
                </div> */}

            </div>
        </div>

    );
}

export default AddService;