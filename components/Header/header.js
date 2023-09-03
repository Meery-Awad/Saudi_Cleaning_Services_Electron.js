import React, { useState } from "react";
import './header.scss';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../bootstrap/css/bootstrap.css'
import logo from '../../photo/icon.ico'
import { useSelector } from "react-redux";
import { useBetween } from 'use-between';


const Header = () => {

  const state = useSelector((state) => state.data);

  const { Lang, setLang, arrayLang, isLogIn, setisLogIn, notiNum, setNotiNum } = useBetween(state.useShareState);



  const changeLang = (e) => {

    setLang(e.target.value)

  }

  const logOut = () => {
    setisLogIn(false);
  }


  return (
    <div className="Header" >

      <Navbar expand="lg" className="navHeader" style={{ "direction": (Lang == 'Arabic' || Lang == 'pakistani') ? 'rtl' : 'ltr' }}>
        <Container>

          <Navbar.Toggle aria-controls="basic-navbar-nav"
            style={{ "border": "2px solid #fff" }}
          > <i className="fa fa-bars"></i></Navbar.Toggle>
          <Navbar.Brand><img src={logo} className='logo' /></Navbar.Brand>
          <Navbar.Collapse id="navbarSupportedContent" className="collapse navbar-collapse">

            <Nav className="me-auto nav navbar-nav " >
              <div className="NavBar" style={{ "z-index": '2' }} >
                <NavLink to='/MainPage' className="nav-link" >
                  <div className="navL main"> {arrayLang.main} </div></NavLink>
              
                <NavLink to='/Orders' className="nav-link " > 
                <span className="notiNum" style={{ display: notiNum > 0 ? 'block' : 'none' }}>
                  {notiNum <= 99 ? notiNum : 99}
                  <span style={{ display: notiNum > 99 ? 'block' : 'none' }} >+</span>
                </span> 
                <div className="navL ordersNav" >{arrayLang.orders} </div>
                </NavLink>
               
                <NavLink to='/Statistics' className="nav-link" >  <div className="navL statistics" >{arrayLang.statistics} </div></NavLink>
                {/* <NavLink className="nav-link noti" onClick={() => activeNow('.noti')}> <div className="navL">{arrayLang.Noti} </div></NavLink> */}
                <NavLink to='/App/Settings' className="nav-link " >  <div className="navL settingsNav" >{arrayLang.settings} </div></NavLink>

                <NavLink to="/App" className="nav-link logOut" ><div className="navL " onClick={logOut}>{arrayLang.logOut}  </div></NavLink>
                <div className="line1"></div>
                <div >

                  <select
                    className=" selectBox"
                    onChange={changeLang}
                    name="lang"
                    value={Lang}
                  >

                    <option className="optionsMenu" value="Arabic" >
                      {arrayLang.arabic}
                    </option>
                    <option className="optionsMenu" value="en">
                      {arrayLang.en}
                    </option>
                    <option className="optionsMenu" value="indian">
                      {arrayLang.indian}
                    </option>
                    <option className="optionsMenu" value="pakistani">
                      {arrayLang.pakistani}
                    </option>
                  </select>


                </div>
              </div>
            </Nav>


          </Navbar.Collapse>
        </Container>
      </Navbar>

    </div>
  );
}

export default Header;
