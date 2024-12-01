import React from "react";
import ReactDom from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./Context/ShopContext.jsx";
import Footer from "./Components/Footer.jsx";

ReactDom.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ShopContextProvider>
      <App />
      <Footer />
    </ShopContextProvider>
  </BrowserRouter>
);
