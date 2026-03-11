import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../api/apiClient";
import type { Pizza } from "../types/Pizza";
import * as Sentry from "@sentry/react";

const EditPizzaPage = () => {
  const [pizza, setPizza] = useState<Pizza>({
    nev: "",
    leiras: "",
    ar: 0,
    imageUrl: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    apiClient
      .get(`/pizzak/${id}`)
      .then((res) => setPizza(res.data))
      .catch((e) => {toast.error("Sikertelen betöltés!"); Sentry.captureException(e)});
  }, []);

  const submit = () => {
    const dto = {
      nev: pizza.nev,
      leiras: pizza.leiras,
      ar: pizza.ar,
      imageUrl: pizza.imageUrl,
    };
    apiClient
      .put(`/pizzak/${id}`, dto)
      .then(() => toast.success("Sikeres hozzáadás!"))
      .catch((e) => {toast.error("Sikertelen hozzáadás!"); Sentry.captureException(e)});
    navigate("/");
  };

  return (
    <>
      Név:{" "}
      <input
        type="text"
        value={pizza.nev}
        onChange={(e) => {
          setPizza({ ...pizza, nev: e.target.value });
        }}
      />
      Leírás:{" "}
      <input
        value={pizza.leiras}
        type="text"
        onChange={(e) => {
          setPizza({ ...pizza, leiras: e.target.value });
        }}
      />
      Ár:{" "}
      <input
        value={pizza.ar}
        type="number"
        onChange={(e) => {
          setPizza({ ...pizza, ar: Number(e.target.value) });
        }}
      />
      Kép (útvonal):{" "}
      <input
        value={pizza.imageUrl}
        type="text"
        onChange={(e) => {
          setPizza({ ...pizza, imageUrl: e.target.value });
        }}
      />
      <button onClick={() => submit()}>Létrehozás</button>
    </>
  );
};

export default EditPizzaPage;
