import React, { useEffect } from "react";
import './orders.scss';
import '../laundry/laundary.scss'
import Header from "../Header/header";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useBetween } from "use-between";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import OrderDetails from "../orderDetalils/orderDetails";
import Noti1 from "../laundry/noti";
import WOW from 'wowjs';
import '../../css/animate.css'



const Orders = () => {
    const state = useSelector((state) => state.data);
    const { Lang, setLang, arrayLang, orders, lati, setIndexOrderDet, stateOrderOption
        , notiNum, setNotiNum } = useBetween(state.useShareState);
    useEffect(() => {
        const active = document.querySelector(".ordersNav");

        Array.from(document.querySelectorAll(".navL"))
            .forEach(function (val) {

                val.style.borderBottom = "none";
                // val.style.border='none';

            });
        // active.style.fontSize = '0.83rem;';
        active.style.borderBottom = "2px solid #88c0ee";
        document.querySelector('.orders').style.display = "block"
       setNotiNum(0);
    })


    const [stateOrder, setChangeState] = useState(true);
    const [indexOrder, setIndexOrder] = useState(-1)
    const [lazy, setLazy] = useState(false)
    const [optionState, setOptionState] = useState(stateOrderOption[0].option);



    const [showOrderDetal, setOrderDetal] = useState(false);
    const handleCloseOrderDetal = () => setOrderDetal(false);

    useEffect(() => {
        new WOW.WOW({
          live: false
        }).init();
      }, [])
    useEffect(() => {
        var item = orders[indexOrder];
        if (indexOrder != -1) {
            if (item.state == "قيد انتظار قبول المغسلة") {


                item.state = "قيد انتظار موافقة استلام المندوب"


            }
            else if (item.state == "قيد انتظار موافقة استلام المندوب") {


                item.state = "قيد الاحضار من العميل"


            }
            else if (item.state == "قيد الاحضار من العميل") {


                item.state = "قيد الاحضار للمغسلة"



            }
            else if (item.state == "قيد الاحضار للمغسلة") {


                item.state = "قيد بدء التنفيذ"


            }
            else if (item.state == "قيد بدء التنفيذ") {

                item.state = "قيد التنفيذ"



            }
            else if (item.state == "قيد التنفيذ") {
                if (item.delevery == true) {
                    item.state = "جاهز للتسليم للمندوب"


                }
                else {
                    item.state = "جاهز للتسليم للعميل"


                }

            }
            else if (item.state == "جاهز للتسليم للمندوب") {


                item.state = "قيد انتظار موافقة استلام المندوب"

            }

            else if (item.state == "قيد انتظار موافقة استلام من المندوب" && item.delevery == true) {

                item.state = "قيد الاحضار من المغسلة"

            }
            else if (item.state == "قيد الاحضار من المغسلة" && item.delevery == true) {

                item.state = "قيد الاحضار للعميل"


            }
            else if (item.state == "قيد الاحضار للعميل" && item.delevery == true) {

                item.state = "تم التسليم للعميل"


            }
            else if (item.state == "جاهز للتسليم للعميل" && item.delevery == false) {

                item.state = "تم التسليم للعميل"

            }
            else if (item.state == "تم التسليم للعميل") {
                item.state = "تم التسليم للعميل"

            }
        }
        setLazy(!lazy);
    }, [stateOrder]);
    const handleBtn = (i) => {

        setChangeState(!stateOrder); setIndexOrder(i)

    }
    const ordersList = orders.length ? (

        orders.map((item, i) => {



            if (item.state == "قيد انتظار قبول المغسلة") {
                item.state1 = Lang == "Arabic" ? "قيد انتظار قبول المغسلة" : Lang == "en" ? "Waiting for the laundry to be accepted"
                    : Lang == "indian" ? "लॉन्ड्री स्वीकार किए जाने की प्रतीक्षा की जा रही है" : "لانڈری کے قبول ہونے کا انتظار ہے۔",

                    item.btn1 = Lang == "Arabic" ? "قبول" : Lang == "en" ? "Acceptance"
                        : Lang == "indian" ? "स्वीकार" : "قبولیت"
                item.btn2 = Lang == "Arabic" ? "رفض" : Lang == "en" ? "To reject"
                    : Lang == "indian" ? "अस्वीकार करना" : "رد کر دینا"

            }
            else if (item.state == "قيد انتظار موافقة استلام المندوب") {

                item.state1 = Lang == "Arabic" ? "قيد انتظار موافقة استلام المندوب" : Lang == "en" ? "Awaiting Delivery man approval"
                    : Lang == "indian" ? "प्रतिनिधि अनुमोदन की प्रतीक्षा कर रहा है" : "مندوب کی منظوری کا انتظار ہے۔",
                    item.btn1 = "", item.btn2 = "";

            }
            else if (item.state == "قيد الاحضار من العميل") {
                item.state1 = Lang == "Arabic" ? "قيد الاحضار من العميل" : Lang == "en" ? "Received from the client"
                    : Lang == "indian" ? "डिलीवरी मैन की मंजूरी का इंतजार" : "ڈیلیوری مین کی منظوری کا انتظار ہے۔"
                item.btn1 = "", item.btn2 = "";

            }
            else if (item.state == "قيد الاحضار للمغسلة") {
                item.state1 = Lang == "Arabic" ? "قيد الاحضار للمغسلة" : Lang == "en" ? "Being brought to the laundromat"
                    : Lang == "indian" ? "लॉन्ड्रोमैट में लाया जा रहा है" : "لانڈرومیٹ پر لایا جا رہا ہے۔"
                item.btn1 = Lang == "Arabic" ? "استلام من المندوب" : Lang == "en" ? "Receipt from the delegate"
                    : Lang == "indian" ? "प्रतिनिधि से प्राप्त करें" : "نمائندے سے رسید",
                    item.btn2 = "";

            }
            else if (item.state == "قيد بدء التنفيذ") {
                item.state1 = Lang == "Arabic" ? "قيد بدء التنفيذ" : Lang == "en" ? "Implementation is underway"
                    : Lang == "indian" ? "क्रियान्वयन हो रहा है" : "عمل درآمد جاری ہے۔"
                item.btn1 = Lang == "Arabic" ? "بدء" : Lang == "en" ? "Start" : Lang == "indian" ? "प्रारंभ" : "شروع",
                    item.btn2 = "";
            }
            else if (item.state == "قيد التنفيذ") {
                item.state1 = Lang == "Arabic" ? "قيد التنفيذ" : Lang == "en" ? "Underway" : Lang == "indian" ? "प्रक्रिया में" : "جاری ہے۔"
                item.btn1 = Lang == "Arabic" ? "انتهاء" : Lang == "en" ? "an end" : Lang == "indian" ? "एक अंत" : "ایک اختتام"
                item.btn2 = "";

            }
            else if (item.state == "جاهز للتسليم للمندوب" && item.delevery == true) {

                item.state1 = Lang == "Arabic" ? " جاهز للتسليم للمندوب" : Lang == "en" ? "Ready for delivery to the Delivery man"
                    : Lang == "indian" ? "डिलीवरी मैन को डिलीवरी के लिए तैयार" : "ڈیلیوری مین کو ڈیلیوری کے لیے تیار"
                item.btn1 = Lang == "Arabic" ? "تسليم للمندوب" : Lang == "en" ? "Delivery to the delivery man"
                    : Lang == "indian" ? "डिलीवरी मैन को डिलीवरी" : "ڈیلیوری مین کو ڈیلیوری",
                    item.btn2 = "";
            }
            else if (item.state == "جاهز للتسليم للعميل" && item.delevery == false) {
                item.state1 = Lang == "Arabic" ? " جاهز للتسليم للعميل" : Lang == "en" ? "Ready for delivery to the client"
                    : Lang == "indian" ? "ग्राहक को देने के लिए तैयार है" : "گاہک کو دینے کے لیے تیار ہے۔"

                item.btn1 = Lang == "Arabic" ? "تسليم للعميل" : Lang == "en" ? "Delivery to the client"
                    : Lang == "indian" ? "ग्राहक को देना" : "گاہک کو دیں",
                    item.btn2 = "";

            }
            else if (item.state == "قيد انتظار موافقة استلام المندوب" && item.delevery == true) {
                item.state1 = Lang == "Arabic" ? "قيد انتظار موافقة استلام المندوب" : Lang == "en" ? "Awaiting delegate approval"
                    : Lang == "indian" ? "प्रतिनिधि अनुमोदन की प्रतीक्षा कर रहा है" : "مندوب کی منظوری کا انتظار ہے۔",
                    item.btn1 = "", item.btn2 = "";
            }
            else if (item.state == "قيد الاحضار من المغسلة" && item.delevery == true) {
                item.state1 = Lang == "Arabic" ? "قيد الاحضار من المغسلة" : Lang == "en" ? "Being brought from the laundromat"
                    : Lang == "indian" ? "लॉन्ड्रोमैट से लाया जा रहा है" : "لانڈرومیٹ سے لایا جا رہا ہے۔",
                    item.btn1 = Lang == "Arabic" ? "تسليم للمندوب" : Lang == "en" ? "Delivery to the delegate"
                        : Lang == "indian" ? "प्रतिनिधि को दें" : "مندوب کو دیں۔",
                    item.btn2 = "";

            }
            else if (item.state == "قيد الاحضار للعميل" && item.delevery == true) {
                item.state1 = Lang == "Arabic" ? "قيد الاحضار للعميل" : Lang == "en" ? "Being brought to the client"
                    : Lang == "indian" ? "ग्राहक के पास लाया जा रहा है" : "گاہک تک لایا جا رہا ہے۔",
                    item.btn1 = "", item.btn2 = "";

            }

            else if (item.state == "تم التسليم للعميل") {
                item.state1 = Lang == "Arabic" ? "تم التسليم للعميل" : Lang == "en" ? "Delivered to the client"
                    : Lang == "indian" ? "ग्राहक को दिया" : "گاہک کو پہنچایا";
                item.btn1 = "", item.btn2 = "";
            }

            return (
                (item.state1 == optionState || optionState == "الكل" || optionState == "All" || optionState == "सभी" || optionState == "تمام") &&
                <div className='item wow bounceInLeft'  data-wow-duration='0.5s' key={item._id}  >
  
                    <div className="orderInfo" onClick={() => { setIndexOrderDet(i); setOrderDetal(true); }}>

                        <div className="numOfOrder" >{arrayLang.orderDetelNum} : {i + 1}</div>
                        <div className="dateOrder">{item.date}</div>
                        <div className="stateOrder"> <i className="fa fa-refresh"></i> {item.state1}</div>
                    </div>
                    <div className="btnOrders" onClick={() => handleBtn(i)}>
                        <div className="btn1" style={{ display: item.btn1 == "" ? 'none' : 'inline' }}>
                            {item.btn1}
                        </div>
                        <div className="btn2" style={{ display: item.btn2 == "" ? 'none' : 'inline' }}
                            onClick={() => { setChangeState(!stateOrder); }}>
                            {item.btn2}
                        </div>
                    </div>

                </div>

            )
        })) : (<p></p>)
    var option = stateOrderOption.map((item, i) => {

        return (

            <option className="optionsMenu" value={item.option} >
                {item.option}
            </option>


        )
    })
    const changeSelection = (e) => {
        setOptionState(e.target.value);

    }
    useEffect(() => {
        setOptionState(stateOrderOption[0].option);
    }, [Lang])
    return (

        <div className="orders" style={{ "direction": Lang == 'Arabic' || Lang == 'pakistani' ? 'rtl' : 'ltr' }}>
           
          
            <Header />
            <div className="col-md-12 text-center heading-main">
                <h2 classnName="heading">{arrayLang.orders}</h2>
                <div className="separator"><i className="fa fa-home below-line-about-icon"></i></div>
            </div>
            <select
                className="SelectedBox"
                onChange={changeSelection}
                value={optionState}
            >
                {option}

            </select>

            {orders.length != 0 &&
                ordersList
            }
            {
                orders.length == 0 && <p className="empty">{arrayLang.NoOrders}</p>
            }

            <Modal show={showOrderDetal} onHide={handleCloseOrderDetal} size='lg'>

                <Modal.Body><OrderDetails /></Modal.Body>
                <Modal.Footer dir="auto">

                    <Button className="btn btn-calendar-modal-cancel"
                        onClick={handleCloseOrderDetal}>
                        {arrayLang.close}
                    </Button>
                </Modal.Footer>

            </Modal>

        </div>



    );
}

export default Orders;