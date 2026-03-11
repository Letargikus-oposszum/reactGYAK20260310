import { useEffect, useState } from "react";
import type { Pizza } from "../types/Pizza";
import apiClient, { baseURL } from "../api/apiClient";
import { toast } from "react-toastify";
import { Button, Card, Container, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Sentry from "@sentry/react";

const AllPizzaPage = () => {
  const [pizzak, setPizzak] = useState<Array<Pizza>>([]);
  const [kosar, setKosar] = useState<Array<number>>(
    JSON.parse(localStorage.getItem("thecart") ?? "[]"),
  );

  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get("/pizzak")
      .then((res) => setPizzak(res.data))
      .catch((e) => {toast.error("Sikertelen betöltés!"); Sentry.captureException(e)});
  }, []);

  const toCart = (pizzaId: number) => {
    setKosar([...kosar, pizzaId]);
    toast.success("Sikeresen kosárba téve!")
  };

  useEffect(() => {
    localStorage.setItem("kosar", JSON.stringify(kosar));
  }, [kosar]);

  const createItem = (pizza: Pizza) => {
    return (
      <Card style={{ width: "18rem" }}>
        <Image src={`${baseURL}/kepek/${pizza.imageUrl}`} />
        <Card.Body>
          <Card.Title>
            <strong>{pizza.nev}</strong>
          </Card.Title>
        </Card.Body>
        <Card.Footer>
          <Button
            onClick={() => {
              navigate(`/onepizza/${pizza.id}`);
            }}
          >
            Részletek
          </Button>
          <Button onClick={() => toCart(Number(pizza.id))}>Kosárba</Button>
        </Card.Footer>
      </Card>
    );
  };

  return <Container><Row>{pizzak.map((pizza) => createItem(pizza))}</Row></Container>;
};

export default AllPizzaPage;
