import { useEffect, useState } from "react";
import type { Pizza } from "../types/Pizza";
import apiClient, { baseURL } from "../api/apiClient";
import { toast } from "react-toastify";
import { Button, Card, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const OnePizzaPage = () => {
  const [pizza, setPizza] = useState<Pizza>();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    apiClient
      .get(`/pizzak/${id}`)
      .then((res) => setPizza(res.data))
      .catch(() => toast.error("Sikertelen betöltés!"));
  }, []);

  const deletePizza = () => {
    apiClient
      .delete(`/pizzak/${id}`)
      .then(() => toast.success("Sikeres törlés!"))
      .catch(() => toast.error("Sikertelen törlés!"));
    navigate("/");
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Image src={`${baseURL}/kepek/${pizza?.imageUrl}`} />
      <Card.Body>
        <Card.Title>
          <strong>{pizza?.nev}</strong>
        </Card.Title>
        <Card.Text>
          {pizza?.leiras} {pizza?.ar} Ft
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button variant="success" onClick={() => navigate("/")}>Home</Button>
        <Button variant="primary" onClick={() => navigate(`/editpizza/${id}`)}>Szerkesztés</Button>
        <Button variant="danger" onClick={() => deletePizza()}>Törlés</Button>
      </Card.Footer>
    </Card>
  );
};

export default OnePizzaPage;
