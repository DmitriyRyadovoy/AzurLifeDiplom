import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

const layout = ({ children }) => {
  return (
    <div className="wrapper">
      <Header />
      <div className="Page_content">
        {children}
        <Toaster />
      </div>
      <Footer />
    </div>
  );
}

export default layout;