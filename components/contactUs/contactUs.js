
import React from 'react';
import './contactUs.css';
import contactusImg from "../../photo/contactusImg.jpg"
import { useSelector } from "react-redux";
import { useBetween } from 'use-between';
import { NavLink } from 'react-router-dom';

const ContactUs = () => {
    const state = useSelector((state) => state.data);

    const { Lang, arrayLang } = useBetween(state.useShareState);


    return (
        <div className='contactUs' style={{ "direction": Lang == 'Arabic' || Lang == 'pakistani' ? 'rtl' : 'ltr' }}  >

            <img src={contactusImg} />
            <div>
                <h3 className='contact-header'>{arrayLang.contactUs}</h3>

                <div className="separator"> <i className="fa fa-phone" aria-hidden="true"></i></div>
                <div className='row'>

                    <span className='contact-subheading'><bdi>{arrayLang.text}</bdi></span>


                </div>
                <input type="text" placeholder={arrayLang.phoneOrEmail} className="inputContact"></input>
                <br/>
                {/* <input type="text" placeholder="كلمة المرور"></input> */}
                <textarea placeholder={arrayLang.textarea} className='textarea-contactUs' rows='10'></textarea>

            </div>

        </div>
    )
}
export default ContactUs;