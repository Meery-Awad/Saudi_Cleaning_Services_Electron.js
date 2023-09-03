import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useBetween } from "use-between";
import ShowMore from 'react-show-more-button';
import './orderDetails.scss'
import Orders from "../Orders/orders";


const OrderDetails = () => {

  const state = useSelector((state) => state.data);
  

  const { Lang, setLang, arrayLang, orders, indexOrderDet } = useBetween(state.useShareState);
  const [handleSeeMore, setHandelSeeMore] = useState(true);
  const [handleTextSeeMore, sethandleTextSeeMore] = useState(arrayLang.ShowMore);
  const [indexOrder, setIndexOrder] = useState(-1);
  const [stateOrder, setChangeState] = useState(true);
  const [lazy, setLazy] = useState(false)
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
 

  useEffect(() => {
    var item = orders[indexOrderDet];
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
    setIndexOrder(indexOrderDet);
  }, [stateOrder]);
  const btnOrderDETIAL = () => {
   
    var item = orders[indexOrderDet];
    
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
      <div >
        <div className="btn1" onClick={()=>setChangeState(!stateOrder)} style={{ display: item.btn1 == "" ? 'none' : 'inline' }}>{item.btn1}</div>
        <div className="btn2" style={{ display: item.btn2 == "" ? 'none' : 'inline' }}>{orders[indexOrderDet].btn2}</div>
      </div>
    )
  }
  const orderDet =
    orders[indexOrderDet].orderDetel.map((item, i) => {

      return (


        <tr className="firstRow">
          <td>{i + 1}</td>
          <td>{item.orderDetelType}</td>
          <td>{item.orderDetelState}</td>
          <td>{item.orderDetelNum}</td>
          <td>{item.price}</td>
        </tr>





      )
    })

  return (
   
    <div className="orderDet" style={{ "direction": (Lang == 'Arabic' || Lang == 'pakistani') ? 'rtl' : 'ltr' }} >

      <div className='item'  id='item' style={{ "direction": Lang == 'Arabic' || Lang == 'pakistani' ? 'rtl' : 'ltr' }} >
        <div className="orderInfo">
          <div className="numOfOrder"> <span className="text"> {arrayLang.orderDetelNum} :</span> {orders[indexOrderDet].orderDetelNum} </div>
          <div><span className="text"> {arrayLang.clientName}: </span> {orders[indexOrderDet].clientName}  </div>
          <div className="stateOrd"> <span className="text">{arrayLang.clientPhone}:</span>{orders[indexOrderDet].phone} </div>
          <div className="dateOrder"><span className="text">{arrayLang.OrderDate}:</span>{orders[indexOrderDet].date}</div>
          <div className="stateOrd"> <span className="text">{arrayLang.OrderStatus}:</span> {orders[indexOrderDet].state1} </div>

          <div className="orderInfo">

            <div className="mt-2">
              <div className="col-lg-12 orderText">
                <div className="text">{arrayLang.OrderDetails}</div>
              </div>
            </div>

            <div >
              <ShowMore maxHeight={200}
                onChange={changeBtnSeeMore}
                button={
                  <div className="BtnSeeMore">{handleTextSeeMore}</div>}
              >
                <table id="exampl" className="table cell-border"   >
                  <thead className="TableHead">
                    <tr>
                      <th>#</th>
                      <th >{arrayLang.WidgetType}</th>
                      <th>{arrayLang.orderType}</th>
                      <th>{arrayLang.NumberOfPieces}</th>
                      <th>{arrayLang.TheCost}</th>

                    </tr>
                  </thead>
                  <tbody>

                    {orderDet}

                  </tbody>
                </table>
              </ShowMore>

            </div>
          </div>
          <div>{arrayLang.TotalSummation}: 180.0</div>
        </div>
        <div className="btnOrders">
          {btnOrderDETIAL()}
        </div>

      </div>

    </div>


  );
}

export default OrderDetails;