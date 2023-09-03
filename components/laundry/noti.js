import React, { useEffect, useRef, useState } from "react";
import '../laundry/laundary.scss';
import '../addService/addService.scss'
import { useSelector } from "react-redux";
import { useBetween } from "use-between";




const Noti1 = () => {
    const state = useSelector((state) => state.data);

    const { Lang, setLang, arrayLang, lati, setLati, longi, setLongi, setNoti
        , setSuccess, NewLandServi } = useBetween(state.useShareState);
    const [notSuccess, setNotSuccess] = useState(false);
    const [lazy, setLazy] = useState(false);


    const [inputtext, setinputtext] = useState({
        lat: lati,
        long: longi
    });
    const ref = useRef();
    const ref1 = useRef();
    const ref2 = useRef();
    useEffect(() => {
        if (lazy == true)
            getCoord()
        setLazy(true)
    }, [NewLandServi])

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

    const getCoord = () => {

        if (inputtext.lat != "" && inputtext.long != ""&&inputtext.lat[0].toLowerCase() == inputtext.lat[0].toUpperCase()&&inputtext.long[0].toLowerCase() == inputtext.long[0].toUpperCase()) {
            setNoti(false);
            setSuccess(true);
            setLati(inputtext.lat)
            setLongi(inputtext.long)


        }
        else {
            setNotSuccess(true);
        }

    }
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)
    const [visible2, setVisible2] = useState(false)



    const _handleContextMenu = (event) => {
        event.preventDefault();

        setVisible(true);
        setVisible2(false);
        setVisible1(false);


    };

    const _handleClick = (event) => {
       
        const wasOutside = !(event.target.contains === ref);

        if (wasOutside && visible) setVisible(false);
        setVisible2(false);
        setVisible1(false);
    };
    const _handleContextMenu1 = (event) => {

        event.preventDefault();

        setVisible1(true);


    };
    const _handleClick1 = (event) => {

        const wasOutside = !(event.target.contains === ref1);

        if (wasOutside && visible1) setVisible1(false);
        setVisible2(false);
        setVisible(false);

    };
    const pasteLati = () => {
        console.log(1);
        navigator.clipboard.readText().then(
            latiNum => setinputtext(() => {
                return {

                    lat: latiNum
                }

            })

        )
        setVisible1(false);
    }

    const _handleContextMenu2 = (event) => {
        event.preventDefault();

        setVisible2(true);


    };
    const _handleClick2 = (event) => {

        const wasOutside = !(event.target.contains === ref2);

        if (wasOutside && visible2) setVisible2(false);
        setVisible(false);
        setVisible1(false);

    };
    const pasteLong = () => {
        navigator.clipboard.readText().then(
            longNum => setinputtext(() => {
                return {

                    long: longNum
                }

            })

        )
        setVisible2(false);
    }

    return (
        <div className="Noti1" style={{ "direction": (Lang == 'Arabic' || Lang == 'pakistani') ? 'rtl' : 'ltr' }} >
            {notSuccess &&
                <div className="notSuccessADDServi1">
                    <div className="closebtn" onClick={() => setNotSuccess(false)}>×</div>
                    <b>{arrayLang.fieldsCorrectlyError} </b>
                    <i className="fa fa-exclamation fa-1x" style={{ color: "#f44336" }}></i>
                </div>
            }
            {(visible || null) &&

                <div ref={ref} className="contextMenu">
                    <div className="contextMenu--option"
                        onClick={() => { navigator.clipboard.writeText("https://www.gps-coordinates.net/my-location"); setVisible(false) }}>
                        نسخ
                    </div>


                </div>
            }
            {(visible1 || null) &&

                <div ref={ref} className="contextMenu1">
                    <div className="contextMenu--option"
                        onClick={pasteLati}>
                        لصق
                    </div>


                </div>
            }
            {(visible2 || null) &&

                <div ref={ref} className="contextMenu2">
                    <div className="contextMenu--option"
                        onClick={pasteLong}>
                        لصق
                    </div>


                </div>
            }

            <div className="serviceNum" > {arrayLang.AreYouInLaund} </div>
            <p> - {arrayLang.textNotiLocation1} </p>
            <p> - {arrayLang.textNotiLocation2} </p>
            <p><b> - {arrayLang.goToLink}</b> </p>

            <div className="inputNoti" >
                <a style={{ color: "rgba(14, 133, 230,0.8)", borderBottom: "1px solid rgba(14, 133, 230,0.8)" }}
                    className="LocationLink" onContextMenu={_handleContextMenu} onClick={()=>{ api.sendUrl("goToUrl", "https://www.gps-coordinates.net/my-location")}}>
                    https://www.gps-coordinates.net/my-location</a>
                <div className="inputeNotiCont">

                    <label ><b>Latitude :</b></label> <input type="text" className="latiInput" value={inputtext.lat} name="lat"
                        onChange={inputEvent} onContextMenu={_handleContextMenu1} onClick={_handleClick1}></input><br />
                    <label><b>Longitude : </b></label> <input type="text" value={inputtext.long} name="long"
                        onChange={inputEvent} onContextMenu={_handleContextMenu2} onClick={_handleClick2}></input>
                </div>
            </div>


        </div>


    );
}

export default Noti1;