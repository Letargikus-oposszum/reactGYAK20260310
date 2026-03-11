import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import apiClient from "../api/apiClient";
import type { Pizza } from "../types/Pizza";
import { Button, Table } from "react-bootstrap";
import * as Sentry from "@sentry/react";

const CartPage = () => {
  const [pizzak, setPizzak] = useState<Array<Pizza>>([]);
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    apiClient
      .get("/pizzak")
      .then((response) => setPizzak(response.data))
      .catch((e) => {toast.error("Sikertelen betöltés!"); Sentry.captureException(e)});
  }, []);

  const [kosar, setKosar] = useState<Array<number>>(
    JSON.parse(localStorage.getItem("kosar") ?? "[]")
  );

  useEffect(()=>{
    localStorage.setItem("kosar",JSON.stringify(kosar));
  },[kosar])

  const removeItem = (index: number) => {
    setKosar(kosar.filter((i) => i /= index));
  };

  return (
    <>
      <h1>Kosár tartalma</h1>
      <Table striped bordered hover>
        <thead>
          <th>Név</th>
          <th>Ár</th>
        </thead>
        <tbody>
          {kosar.map((id, index) => {
            const pizza = pizzak.find((p) => p.id == id);

            setTotal(prev => prev += Number(pizza?.ar));
            return (
              <tr>
                <td>{pizza?.nev}</td>
                <td>{pizza?.ar} Ft</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => removeItem(Number(index))}
                  >
                    Törlés
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <td>Összesen</td>
          <td>{total} Ft</td>
          <td></td>
        </tfoot>
      </Table>
    </>
  );
};

export default CartPage;
