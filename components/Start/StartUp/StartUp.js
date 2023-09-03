import './StartUp.scss';
import '../../contactUs/contactUs.scss'
import cleaning from './Pic/cleaning2.webp'
import { getTranslatedText as translate } from '../Localization/Translation';
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { useBetween } from 'use-between';
import Login from './LogIn/Login';
import SignUp from './SignUp/SignUp';
import LanguageSelect from '../LanguageSelection/LanguageSelect.js'
import { NavLink } from 'react-router-dom';
import ContactUs from '../../contactUs/contactUs';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const StartUp=()=> {
    
    const state = useSelector((state) => state.data);

    const { locale ,Lang,arrayLang } = useBetween(state.useShareState);
    
    

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);

    };
    const handleShow = () => {
        setShow(true);
       
    };
    const toLogin = () => {
        document.querySelector('.Login').classList.toggle('current-section-start')
        document.querySelector('.Startup-form').classList.remove('current-section-start')
        document.querySelector('.copy-rights-section').classList.remove('current-section-start')
    }


    return (
        <div className="StartUp" >
            <div className='StartUp-container row' dir='auto'>
                {/* Form */}
                <div className='Startup-form-container col-md'>

                    <div className='Startup-form current-section-start'>
                        <div className='Startup-form-header-language'>
                            <div className='Startup-form-header'>{translate('Startup-form-header', locale)}</div>
                            {/* Language Selection */}
                            <LanguageSelect />
                        </div>
                        {/* Start Up section */}
                        <div className="mb-3 Startup-box-text">
                        {translate('Startup-box-text-1', locale)}
                            
                        </div>
                        <button type="submit" className="btn btn-primary btn-startup-form" onClick={toLogin}>{translate('Lets-start-btn', locale)}</button>

                    </div>
                    <div className="Signup">
                        <SignUp />
                    </div>
                    <div className="Login">
                        <Login />
                    </div>



                    {/* Copy Rights */}
                    <div className='copy-rights-section current-section-start' >
                        <hr />

                        <div className='copy-rights'>
                            <div>
                                {translate('copy-rights-start-1', locale)}
                      <span className='contact'onClick={handleShow}>{translate('copy-rights-start-2', locale)}</span>
                            </div>
                            
                            <div>
                                <span>&copy; {translate('copy-rights-start-3', locale)} </span>
                                <span>{translate('copy-rights-start-4', locale)}</span>
                            </div>
                            
                            <div>
                                <span>{translate('copy-rights-start-5', locale)}</span>
                            </div>
                        </div>

                    </div>
                    
                </div>
                {/* Image */}
                <div className='Startup-image-container col' dir={(locale === 'EN' || locale === 'HN') ? 'rtl' : 'ltr'}>
                    <img className='Startup-image' src={cleaning} alt='...' />
                </div>

            </div>
            <Modal show={show} onHide={handleClose} size='lg'>

                <Modal.Body><ContactUs /></Modal.Body>
                <Modal.Footer dir="auto">
                <Button variant="primary" className="btn btn-calendar-modal-save"
                    >
                       إرسال
                    </Button>
                    <Button variant="secondary" className="btn btn-calendar-modal-cancel"
                        onClick={handleClose}>
                        إغلاق
                    </Button>
                  
                </Modal.Footer>

            </Modal>
        </div>
    );
}

export default StartUp;
