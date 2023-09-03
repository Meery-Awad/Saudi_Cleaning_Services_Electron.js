import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useBetween } from "use-between";
import './FreeDelivery.scss'
import '../addService/addService.scss'



const FreeDelivery = () => {
    const state = useSelector((state) => state.data);

    const { Lang, setLang, arrayLang, freeDelivery, setfreeDelivery, NewLandServi } = useBetween(state.useShareState);
    const [lazy, setLazy] = useState(false)
    useEffect(() => {

        if (lazy)
            checkAddDelivery();
        setLazy(true)

    }, [NewLandServi])

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    const [addDelivery, setAddDelivery] = useState([{}])
    const [check1, setCheck1] = useState(false)
    const [check2, setCheck2] = useState(false)
    const [check3, setCheck3] = useState(false)
    const [check4, setCheck4] = useState(false)
    const [check5, setCheck5] = useState(false)
    const [checkALL, setCheckAll] = useState(false)

    const [errorDelivery, setErrorDelivery] = useState(false)
    const [errorDelivery1, setErrorDelivery1] = useState(false)

    const [inputtext, setinputtext] = useState({

        fromData: today,
        toDate: today
    });

    const checkAddDelivery = () => {
        if (!check1 && !check2 && !check3 && !check4)
            setErrorDelivery(true)
        else if (inputtext.fromData || inputtext.toDate)
            setErrorDelivery1(true);

        else
            setfreeDelivery(false)

    }
    const inputEvent = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setErrorDelivery1(false);
       
        setinputtext(() => {
            return {
               
                [name]: value
            }
        });

    }


    return (
        <div className="deliveryCont" style={{ "direction": (Lang == 'Arabic' || Lang == 'pakistani') ? 'rtl' : 'ltr' }}>
            <h2>{arrayLang.freeDelivery}</h2>
            <p> {arrayLang.textFreeDelivery}</p>
            <div className="deliveryList">
                <form className="form">

                    <div className="text">{arrayLang.TargetGroups1}</div>
                    {errorDelivery &&
                        <div className="error">* {arrayLang.errorOffer1} </div>
                    }
                    <div className="formLabelCont">
                        <label className="form__label" for="cb-1">
                            <input name="ref1" onClick={() => { setCheck1(!check1); setErrorDelivery(false) }}
                                checked={check1} type="checkbox" />
                            <span className="caption"  >{arrayLang.bronze}</span>
                        </label>
                        <label className="form__label" for="cb-2">
                            <input name="ref2" onClick={() => { setCheck2(!check2); setErrorDelivery(false) }}
                                checked={check2} type="checkbox" />
                            <span className="caption">{arrayLang.silver}</span>
                        </label>
                        <label className="form__label" for="cb-3">
                            <input name="ref3" onClick={() => { setCheck3(!check3); setErrorDelivery(false) }}
                                checked={check3} type="checkbox" />
                            <span className="caption">{arrayLang.golden}</span>
                        </label>
                        <label className="form__label" for="cb-4">
                            <input name="ref4" onClick={() => { setCheck4(!check4); setErrorDelivery(false) }}
                                checked={check4} type="checkbox" />
                            <span className="caption">{arrayLang.diamond}</span>
                        </label>
                        {/* <label className="form__label" for="cb-5">
                                <input  name="ref5"  calseName={`checkboxes${i}`} onClick={arrayCheck(i)} 
                                checked={check}
                                type="checkbox" />
                                <span className="caption">الكل</span>
                            </label>  */}
                    </div>
                    <div className="text">{arrayLang.DurationOffers}</div>
                    {errorDelivery1 &&
                        <div className="error">* {arrayLang.errorOffer2} </div>
                    }
                    <div className="date" >
                        <div className="fromDate">
                            <p>{arrayLang.OfferStartdate}</p>

                            {/* <i className="fa fa-calendar" aria-hidden="true"></i> */}
                            <input type="date" value={inputtext.fromData} onChange={inputEvent} min={today} name="fromDate" ></input>
                        </div>
                        <div className="fromDate" >
                            <p>{arrayLang.OfferEnddate}</p>
                            {/* <i className="fa fa-calendar" aria-hidden="true"></i> */}
                            <input type="date" value={inputtext.toDate} onChange={inputEvent} min={today} name="toDate"></input>

                        </div>

                    </div>


                </form>


            </div>


        </div>


    );
}

export default FreeDelivery;