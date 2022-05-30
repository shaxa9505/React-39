import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Shop from './components/Shop';
import {ToastContainer} from "react-toastify"
import "./App.css";

function App(props) {
  return (
    <>
    <ToastContainer />
        <Header />
        <Shop />
        <Footer />
    </>
  );
}

export default App;