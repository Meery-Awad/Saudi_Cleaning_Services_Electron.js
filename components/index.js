

import React from 'react';
import 'bootstrap';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, HashRouter, Navigate } from "react-router-dom";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Header from './Header/header';
import stor from '../reducers/index'
import "@fontsource/cairo";
import App from './App'
import Settings from './Setting/setting';
import StartUp from './Start/StartUp/StartUp';
import Orders from './Orders/orders';
import OrderDetails from './orderDetalils/orderDetails';
import Laundary from './laundry/laundary';
import AddService from './addService/addService';
import Statistics from './statistics/statistics';
import ContactUs from './contactUs/contactUs';

const store = createStore(stor);
document.body.style.fontFamily = 'Cairo';

ReactDOM.render(
  // strictMode is a tool for highlighting potential problems in an application

  <React.StrictMode>

    <Provider store={store}>
   
      <HashRouter>

        <Routes>
          <Route exact path="/" element={<Navigate replace to={'/App'} />} />
          <Route path='/StartUp' element={<StartUp />} />
          <Route path='/App' element={<App />} />
          <Route path="/App/Settings" element={<Settings />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/OrderDetails" element={<OrderDetails />} />
          <Route path="/MainPage" element={<Laundary />} />
          <Route path="/AddService" element={<AddService />} />
          <Route path="/Statistics" element={<Statistics />} />
          <Route path="/ContactUs" element={<ContactUs />} />
         


        </Routes>

      </HashRouter>
    </Provider>

  </React.StrictMode>
  ,
  document.getElementById('root'),
);
