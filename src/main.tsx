import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NotFoundPage from "./pages/errors/NotFound";
import AllPizzaPage from "./pages/AllPizza";
import OnePizzaPage from "./pages/OnePizza";
import NewPizzaPage from "./pages/NewPizza";
import EditPizzaPage from "./pages/EditPizza";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./Navbar";
import LoginPage from "./pages/Login";
import CartPage from "./pages/Cart";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://57b372301d769784ba52a0c507a9936c@o4510912035815424.ingest.de.sentry.io/4511025311907920",
  sendDefaultPii: true
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NavbarComp />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllPizzaPage />} />
        <Route path="/onepizza/:id" element={<OnePizzaPage />} />
        <Route path="/newpizza" element={<NewPizzaPage />} />
        <Route path="/editpizza/:id" element={<EditPizzaPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer />
  </StrictMode>,
);
