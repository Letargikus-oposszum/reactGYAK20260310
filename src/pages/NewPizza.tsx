import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../api/apiClient";
import type { Pizza } from "../types/Pizza";
import * as Sentry from "@sentry/react";

const NewPizzaPage = () => {
  const [pizza, setPizza] = useState<Pizza>({
    nev: "",
    leiras: "",
    ar: 0,
    imageUrl: "",
  });

  const navigate = useNavigate();

  const submit = () => {
    apiClient
      .post("/pizzak", pizza)
      .then(() => toast.success("Sikeres hozzáadás!"))
      .catch((e) => {toast.error("Sikertelen hozzáadás!"); Sentry.captureException(e)});
      navigate("/");
  };

  return (
    <>
      Név:{" "}
      <input
        type="text"
        onChange={(e) => {
          setPizza({ ...pizza, nev: e.target.value });
        }}
      />
      Leírás:{" "}
      <input
        type="text"
        onChange={(e) => {
          setPizza({ ...pizza, leiras: e.target.value });
        }}
      />
      Ár:{" "}
      <input
        type="number"
        onChange={(e) => {
          setPizza({ ...pizza, ar: Number(e.target.value) });
        }}
      />
      Kép (útvonal):{" "}
      <input
        type="text"
        onChange={(e) => {
          setPizza({ ...pizza, imageUrl: e.target.value });
        }}
      />
      <button onClick={() => submit()}>Létrehozás</button>
    </>
  );
};

export default NewPizzaPage;
