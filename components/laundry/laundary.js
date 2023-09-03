import React, { useEffect, useState } from "react";
import Header from "../Header/header";
import './laundary.scss';
import { useSelector } from "react-redux";
import { useBetween } from 'use-between';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AddService from "../addService/addService";
// import { useGeolocated } from "react-geolocated";
import Noti1 from "../laundry/noti";
import FreeDelivery from "../FreeDelivery/freeDelivery";
import Discount from "../discount/discount";
import '../addService/addService.scss'
import ShowMore from 'react-show-more-button';
import WOW from 'wowjs';
import '../../css/animate.css'


const Laundary = () => {
    const state = useSelector((state) => state.data);

    const { Lang, setLang, arrayLang, service,setService, isLogIn, showNoti, setNoti, ModelAddSERVI, setModelAddSERVI,
        success, setSuccess, lati, longi, setLanduServi, NewLandServi, freeDelivery, setfreeDelivery
        , discount, setDiscount, delivery } = useBetween(state.useShareState);

    const [notSuccess, setNotSuccess] = useState(false);
    const handleCloseNoti = () => setNoti(false);
    const handleShowNoti = () => {setNoti(true); setNotSuccess(false)};

    const [handleSeeMore, setHandelSeeMore] = useState(true);
    const [handleTextSeeMore, sethandleTextSeeMore] = useState(arrayLang.ShowMore);
    const changeBtnSeeMore = () => {
        if (handleSeeMore == true) {
            sethandleTextSeeMore(arrayLang.ShowTheLeast);
            setHandelSeeMore(false);

        }
        else {
            sethandleTextSeeMore(arrayLang.ShowMore);
            setHandelSeeMore(true);
        }

    }
    const [handleSeeMore1, setHandelSeeMore1] = useState(true);
    const [handleTextSeeMore1, sethandleTextSeeMore1] = useState(arrayLang.ShowMore);
    const changeBtnSeeMore1 = () => {
        if (handleSeeMore1 == true) {
            sethandleTextSeeMore1(arrayLang.ShowTheLeast);
            setHandelSeeMore1(false);

        }
        else {
            sethandleTextSeeMore1(arrayLang.ShowMore);
            setHandelSeeMore1(true);
        }

    }
    useEffect(() => {
        new WOW.WOW({
          live: false
        }).init();
      }, [])
    // const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    //     useGeolocated({
    //         positionOptions: {
    //             enableHighAccuracy: false,
    //         },
    //         userDecisionTimeout: 5000,
    //     });

    // console.log(coords)
    useEffect(() => {

        const active = document.querySelector(".main");

        Array.from(document.querySelectorAll(".navL"))
            .forEach(function (val) {
                val.style.borderBottom = "none";
                // val.style.border='none';

            });

        active.style.borderBottom = "2px solid #88c0ee";
        if (isLogIn == true)
            document.querySelector('.launCont').style.display = "block"
        // navigator.geolocation.getCurrentPosition(function (position) {
        //     alert(position);

        // });



    }, []);



    const [serviNum, setServiNum] = useState(0);
    const [hid, setHid] = useState(true)



    const serviceNum = (num) => {
        setServiNum(num + 1);
        setHid(!hid)
    }

    const Service = service.length!=0 ?
        service.map((item, i) => {
            var seviceTYPE = item.services.map((item1, i) => {
              
                return (
                    <div >
                    <div>{item1.servi}</div>
                    <div>{item1.price}</div>
                    </div>
                )


            })
            

            return (


                <tr className="firstRow" onClick={() => serviceNum(i)}>
                    <td>{i + 1}</td>
                    <td>{item.orderName}</td>
                    <td >
                        <div style={{display:"flex"}}>{seviceTYPE}</div>
                    
                    </td>
                    <td>{item.serviceSize}</td>

                </tr>



            )
        }) :(<p></p>)
    const deliveryArray =
        delivery.map((item, i) => {

            if (item.state == true) {
                item.state1 = Lang == "Arabic" ? 'تمت الموافقة عليه من قبل الادمن' : Lang == "en" ? "Accepted by the admin"
                    : Lang == "indian" ? "व्यवस्थापक द्वारा स्वीकार किया गया" : "ایڈمن نے قبول کر لیا۔"

            }
            else {
                item.state1 = Lang == "Arabic" ? 'في انتظار قبول الادمن' : Lang == "en" ? "Waiting for admin acceptance"
                    : Lang == "indian" ? "व्यवस्थापक स्वीकृति की प्रतीक्षा कर रहा है" : "ایڈمن کی منظوری کا انتظار ہے۔"

            }
            if (item.typeDelivery == "عرض تخفيض") {
                item.typeDelivery1 = Lang == "Arabic" ? "عرض تخفيض" : Lang == "en" ? "Discount offer" : Lang == "indian" ? "छूट की पेशकश" : "ڈسکاؤنٹ پیشکش"

            }
            else {
                item.typeDelivery1 = Lang == "Arabic" ? "عرض توصيل" : Lang == "en" ? "Delivery offer" : Lang == "indian" ? "वितरण प्रस्ताव" : "ڈیلیوری آفر"
            }
            var forhow = item.forHow.map((item1, i) => {
                if (item1 == "ذهبي")
                    item1 = Lang == "Arabic" ? "ذهبي" : Lang == "en" ? "golden" : Lang == "indian" ? "स्वर्ण" : "سنہری"
                if (item1 == "فضي")
                    item1 = Lang == "Arabic" ? "فضي" : Lang == "en" ? "silver" : Lang == "indian" ? "चांदी" : "چاندی"
                if (item1 == "ألماسي")
                    item1 = Lang == "Arabic" ? "ألماسي" : Lang == "en" ? "diamond" : Lang == "indian" ? "हीरा" : "ہیرا"
                if (item1 == "برونزي")
                    item1 = Lang == "Arabic" ? "برونزي" : Lang == "en" ? "bronze" : Lang == "indian" ? "पीतल" : "کانسی"

                return (
                    <div>{item1}</div>
                )


            })
            return (


                <tr className="firstRow">
                    <td>{i + 1}</td>
                    <td>
                        {item.typeDelivery1} {item.typeDelivery == "عرض تخفيض" && <span> {item.par}</span>}
                        <div className="deliveryState">{item.state1}</div>

                    </td>
                    <td >
                        <span>{forhow}</span>

                    </td>
                    <td>{item.fromDate}</td>
                    <td>{item.toDate}</td>

                </tr>



            )
        })
    const close = () => {
        const closeSuccess = document.querySelector(".successGetCoord");
        closeSuccess.style.opacity = "0";
        setTimeout(function () { closeSuccess.style.display = "none"; }, 550);
        setSuccess(false)
    }
    return (

        <div className="launCont" style={{ "direction": (Lang == 'Arabic' || Lang == 'pakistani') ? 'rtl' : 'ltr' }}>
            <Header />
            {/* <div>lati:{lati}</div> */}

            <div className="Noti" style={{ display: hid == true ? 'none' : 'block' }}
            >
                <i onClick={() => setHid(!hid)} className="fa fa-times" aria-hidden="true"></i>
                <div className="serviceNum" > {arrayLang.NotiNum} {serviNum} </div>
                <p>{arrayLang.question}</p>
                <div className="NotiBTN">

                    <div className="editBTN" onClick={() => {
                        setModelAddSERVI(true), setHid(true);
                    }}> {arrayLang.modify}</div>
                    <div className="deleteBTN" onClick={() => setHid(!hid)}>{arrayLang.delete}</div>
                </div>
            </div>
            {success &&
                <div className="successGetCoord">
                   
                    <b>{arrayLang.LocationSuccess}</b>
                    <i className="fa fa-check fa-1"></i>
                    <div className="closebtn " onClick={close}>×</div>
                </div>
            }


            {notSuccess &&
                <div className="notSuccessADDServi">
                   
                    <b>{arrayLang.setLocationError} </b>
                    <i className="fa fa-exclamation fa-1x" style={{ color: "#f44336" }}></i>
                    <div className="closebtn" onClick={() => setNotSuccess(false)}>×</div>
                </div>
            }


            <div className="laun" >

                <div className="launDet">

                    <div className="launDet1 wow bounceInRight"  data-wow-duration='1s'  >
                        <div className="launName">مغسلة الأمين</div>
                        <div className="star"><i className="fa fa-star" aria-hidden="true"></i> 3.4/5.0 </div>
                    </div>
                    <div className="launDet2 wow bounceInLeft"  data-wow-duration='1s'>
                        <div className="phone"><i className="fa fa-phone" aria-hidden="true"></i> 0936292212</div>
                        <div className="LaunLocation"> <i className="fa fa-map-marker" aria-hidden="true"></i>الرياض , السعودية </div>
                        <div className="currentLocation" onClick={handleShowNoti}>{arrayLang.currentLocation}</div>

                    </div>

                </div>
                {/* <div>Latitude: {geolocation.latitude}</div> */}

                <div className="LanduBTN" >
                    <div>
                        <div className="addService" onClick={() => lati != "" ? setModelAddSERVI(true) : setNotSuccess(true)} >
                            <i className="fa fa-plus" aria-hidden="true"></i>{arrayLang.AddServiceLaun}</div>
                    </div>
                    <div className="discount">
                        <div onClick={() => lati != "" ? setfreeDelivery(true) : setNotSuccess(true)} className="deliveryBtn">
                            <i className="fa fa-shopping-cart"></i>{arrayLang.freeDelivery}</div>
                        <div onClick={() => lati != "" ? setDiscount(true) : setNotSuccess(true)} className="discountBtn">
                            <i className="fa fa-truck" aria-hidden="true"></i >{arrayLang.desCount}</div>
                    </div>

                </div>
                <div className="text">

                    {arrayLang.LaundryServices}</div>

                {service.length != 0 &&

                    <div>
                        <ShowMore maxHeight={350}
                            onChange={changeBtnSeeMore}
                            button={
                                <div className="BtnSeeMore">{handleTextSeeMore}</div>}
                        >
                            <table id="exampl" className="table cell-border"   >
                                <thead className="TableHead">
                                    <tr>
                                        <th>#</th>
                                        <th >{arrayLang.WidgetType}</th>
                                        <th>{arrayLang.ServicesProvided_WithIt}</th>
                                        <th>{arrayLang.WidgetSize}</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {Service}
                                </tbody>
                            </table>
                        </ShowMore>

                    </div>
                }
                {
                    service.length == 0 && <p className="empty">{arrayLang.NoServi}</p>
                }

                <div className="text">

                    {arrayLang.LaundryOffers}</div>
                {delivery.length != 0 &&
                    <div >

                        <ShowMore maxHeight={450}
                            onChange={changeBtnSeeMore1}
                            button={
                                <div className="BtnSeeMore">{handleTextSeeMore1}</div>}
                        >
                            <table id="exampl" className="table cell-border"   >
                                <thead className="TableHead">
                                    <tr>
                                        <th>#</th>
                                        <th >{arrayLang.OfferType}</th>
                                        <th>{arrayLang.TargetGroups}</th>
                                        <th>{arrayLang.OfferStartdate}</th>
                                        <th>{arrayLang.OfferEnddate}</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {deliveryArray}
                                </tbody>
                            </table>
                        </ShowMore>

                    </div>
                }
                {
                    delivery.length == 0 && <p className="empty">{arrayLang.NoOffers}</p>
                }


            </div>
            <Modal show={ModelAddSERVI} onHide={() => setModelAddSERVI(false)} size='lg'>

                <Modal.Body><AddService /></Modal.Body>
                <Modal.Footer dir="auto">
                    <Button variant="primary" className="btn btn-calendar-modal-save" onClick={() => setLanduServi(!NewLandServi)}
                    >
                        {arrayLang.AddServiceLaun}
                    </Button>
                    <Button variant="secondary" className="btn btn-calendar-modal-cancel"
                        onClick={() => setModelAddSERVI(false)}>
                        {arrayLang.close}
                    </Button>

                </Modal.Footer>
            </Modal>
            <Modal show={showNoti} onHide={handleCloseNoti} size='lg'>

                <Modal.Body> <Noti1 /></Modal.Body>

                <Modal.Footer dir="auto">
                    <Button variant="primary" className="btn btn-calendar-modal-save" onClick={() => setLanduServi(!NewLandServi)}
                    >
                        {arrayLang.currentLocation}
                    </Button>
                    <Button variant="secondary" className="btn btn-calendar-modal-cancel"
                        onClick={handleCloseNoti}>
                        {arrayLang.close}
                    </Button>
                </Modal.Footer>

            </Modal>
            <Modal show={freeDelivery} onHide={() => setfreeDelivery(false)} size='lg'>

                <Modal.Body><FreeDelivery /></Modal.Body>
                <Modal.Footer dir="auto">
                    <Button variant="primary" className="btn btn-calendar-modal-save" onClick={() => setLanduServi(!NewLandServi)}
                    >
                        {arrayLang.SendToAdmin}
                    </Button>
                    <Button variant="secondary" className="btn btn-calendar-modal-cancel"
                        onClick={() => setfreeDelivery(false)}>
                        {arrayLang.close}
                    </Button>

                </Modal.Footer>
            </Modal>
            <Modal show={discount} onHide={() => setDiscount(false)} size='lg'>

                <Modal.Body><Discount /></Modal.Body>
                <Modal.Footer dir="auto">
                    <Button variant="primary" className="btn btn-calendar-modal-save" onClick={() => setLanduServi(!NewLandServi)}
                    >
                        {arrayLang.AddOffer}
                    </Button>
                    <Button variant="secondary" className="btn btn-calendar-modal-cancel"
                        onClick={() => setDiscount(false)}>
                        {arrayLang.close}
                    </Button>

                </Modal.Footer>
            </Modal>





            <div className="main" style={{ "display": 'none' }}></div>
        </div>


    );
}

export default Laundary;