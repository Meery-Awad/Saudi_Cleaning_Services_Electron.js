import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useBetween } from "use-between";
import Header from "../Header/header"
import BarChart from "../BarChar/barChar";
import './statistics.scss';
import '../laundry/laundary.scss'



const Statistics = () => {
    useEffect(() => {
        const active = document.querySelector(".statistics");

        Array.from(document.querySelectorAll(".navL"))
            .forEach(function (val) {
                val.style.borderBottom = "none";
                // val.style.border='none
            })
        active.style.borderBottom = "2px solid #88c0ee";
        document.querySelector('.StatisticsCont').style.display = "block"
    }, []);
    const state = useSelector((state) => state.data);

    const { Lang, setLang, arrayLang, ordersCount } = useBetween(state.useShareState);
    const [openTap, setOpenTap] = useState(0);

    const orderCountSiceToday =
        ordersCount.map((item, i) => {
            if (item.orderState == "قيد انتظار قبول المغسلة") {
                item.state1 = Lang == "Arabic" ? "قيد انتظار قبول المغسلة" : Lang == "en" ? "Waiting for the laundry to be accepted"
                    : Lang == "indian" ? "लॉन्ड्री स्वीकार किए जाने की प्रतीक्षा की जा रही है" : "لانڈری کے قبول ہونے کا انتظار ہے۔"
            }
            else if (item.orderState == "قيد انتظار موافقة استلام المندوب") {

                item.state1 = Lang == "Arabic" ? "قيد انتظار موافقة استلام المندوب" : Lang == "en" ? "Awaiting delegate approval"
                    : Lang == "indian" ? "प्रतिनिधि अनुमोदन की प्रतीक्षा कर रहा है" : "مندوب کی منظوری کا انتظار ہے۔"


            }
            else if (item.orderState == "قيد الاحضار من العميل") {
                item.state1 = Lang == "Arabic" ? "قيد الاحضار من العميل" : Lang == "en" ? "Received from the client"
                    : Lang == "indian" ? "ग्राहक से प्राप्त हुआ" : "کلائنٹ سے موصول ہوا۔"


            }
            else if (item.orderState == "قيد الاحضار للمغسلة") {
                item.state1 = Lang == "Arabic" ? "قيد الاحضار للمغسلة" : Lang == "en" ? "Being brought to the laundromat"
                    : Lang == "indian" ? "लॉन्ड्रोमैट में लाया जा रहा है" : "لانڈرومیٹ پر لایا جا رہا ہے۔"


            }
            else if (item.orderState == "قيد بدء التنفيذ") {
                item.state1 = Lang == "Arabic" ? "قيد بدء التنفيذ" : Lang == "en" ? "Implementation is underway"
                    : Lang == "indian" ? "क्रियान्वयन हो रहा है" : "عمل درآمد جاری ہے۔"

            }
            else if (item.orderState == "قيد التنفيذ") {
                item.state1 = Lang == "Arabic" ? "قيد التنفيذ" : Lang == "en" ? "Underway" : Lang == "indian" ? "प्रक्रिया में" : "جاری ہے۔"


            }
            else if (item.orderState == "جاهز للتسليم للمندوب") {

                item.state1 = Lang == "Arabic" ? " جاهز للتسليم للمندوب" : Lang == "en" ? "Ready for delivery to the delegate "
                    : Lang == "indian" ? "प्रतिनिधि को देने को तैयार है" : "مندوب کو دینے کے لیے تیار ہیں۔"

            }
            else if (item.orderState == "جاهز للتسليم للعميل") {
                item.state1 = Lang == "Arabic" ? " جاهز للتسليم للعميل" : Lang == "en" ? "Ready for delivery to the client"
                    : Lang == "indian" ? "ग्राहक को देने के लिए तैयार है" : "گاہک کو دینے کے لیے تیار ہے۔"



            }
            else if (item.orderState == "قيد انتظار موافقة استلام المندوب") {
                item.state1 = Lang == "Arabic" ? "قيد انتظار موافقة استلام المندوب" : Lang == "en" ? "Awaiting delegate approval"
                    : Lang == "indian" ? "प्रतिनिधि अनुमोदन की प्रतीक्षा कर रहा है" : "مندوب کی منظوری کا انتظار ہے۔"

            }
            else if (item.orderState == "قيد الاحضار من المغسلة") {
                item.state1 = Lang == "Arabic" ? "قيد الاحضار من المغسلة" : Lang == "en" ? "Being brought from the laundromat"
                    : Lang == "indian" ? "लॉन्ड्रोमैट से लाया जा रहा है" : "لانڈرومیٹ سے لایا جا رہا ہے۔"


            }
            else if (item.orderState == "قيد الاحضار للعميل") {
                item.state1 = Lang == "Arabic" ? "قيد الاحضار للعميل" : Lang == "en" ? "Being brought to the client"
                    : Lang == "indian" ? "ग्राहक के पास लाया जा रहा है" : "گاہک تک لایا جا رہا ہے۔"


            }

            else if (item.orderState == "تم التسليم للعميل") {
                item.state1 = Lang == "Arabic" ? "تم التسليم للعميل" : Lang == "en" ? "Delivered to the client"
                    : Lang == "indian" ? "ग्राहक को दिया" : "گاہک کو پہنچایا";
            }

            return (


                <tr className="firstRow">
                    <td>{item.state1}</td>
                    <td>{item.orderCount}</td>

                </tr>

            )
        })
    const currentTap = (num, classNameOpen, another) => {
        setOpenTap(num);
        document.querySelector(classNameOpen).style.background = "rgba(184, 184, 184, 0.3)"

        document.querySelector(another).style.background = "#fff"



    }

    return (
        <div className="StatisticsCont">
            <Header />

            <div className="Statistics" style={{ "direction": (Lang == 'Arabic' || Lang == 'pakistani') ? 'rtl' : 'ltr' }}>

                <div className="tabStatis">
                    <div onClick={() => currentTap(0, ".statisDay", ".statisYear")} className="statisDay" >{arrayLang.DailyStatistics}</div>
                    <div onClick={() => currentTap(1, ".statisYear", ".statisDay")} className="statisYear">{arrayLang.AnnualStatistics}</div>
                </div>
                <div className="statistics-tab">
                    {openTap === 0 &&
                        <div className="dailyStats">


                            <div className="orderSendToday">
                                <p>{arrayLang.OrdersDelivered} </p>
                                <div className="countOrder">40</div>


                            </div>
                            <p className="title">{arrayLang.OrdersProgress}</p>
                            {ordersCount.length != 0 &&
                                <div >

                                    <table id="exampl" className="table cell-border"   >
                                        <thead className="TableHead">
                                            <tr>

                                                <th style={{ width: "80%" }} >{arrayLang.OrderStatus}</th>
                                                <th style={{ width: "20%" }}>{arrayLang.numberOfOrder}</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orderCountSiceToday}
                                        </tbody>
                                    </table>


                                </div>
                            }
                            {
                                ordersCount.length == 0 && <p className="empty" style={{color:"#888"}}> {arrayLang.NoOrders}</p>
                            }
                        </div>


                    }
                    {
                        openTap == 1 &&
                        <div className="barChar">
                            <div className="barChar1" style={{ "direction": (Lang == 'Arabic' || Lang == 'pakistani') ? 'rtl' : 'ltr' }}>
                                <BarChart selectYear={0}
                                    w={500}
                                    h={300}
                                    svgMt={'2%'}
                                    //  svgMr={'40%'}
                                    paddongXscale={0.1}
                                    XAxisFontS={'0.8em'}
                                    colorText={'white'}
                                    textMt={66}
                                    textFontS={'6.5px'}
                                    display={false}
                                    text="barChar1"
                                />

                            </div>
                            <div className="barChar1" >
                                <BarChart selectYear={0}
                                    w={500}
                                    h={300}
                                    svgMt={'2%'}
                                    //  svgMr={'40%'}
                                    paddongXscale={0.1}
                                    XAxisFontS={'0.8em'}
                                    colorText={'white'}
                                    textMt={66}
                                    textFontS={'6.5px'}
                                    display={false}
                                    text="barChar2"
                                />

                            </div>
                        </div>
                    }
                </div >


            </div >

        </div>
    );
}

export default Statistics;