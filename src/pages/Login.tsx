import { useState } from "react";
import type { User } from "../types/User";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import * as Sentry from "@sentry/react"

const LoginPage = () => {
  const [user, setUser] = useState<User>({ username: "", password: "" });
  const navigate = useNavigate();

  const submit = () => {
    apiClient
      .post("/login", user)
      .then(() => {
        localStorage.setItem("credentials",JSON.stringify(user))
        toast.success("Sikeres bejelentkezés!");
        navigate("/");
      })
            .catch((e) => {toast.error("Sikertelen bejelentkezés!"); Sentry.captureException(e)});

  };

  return (
    <Container>
      <Form>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationFormik01">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                onChange={(e)=>{setUser({...user,username:e.target.value})}}
              />
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={(e)=>{setUser({...user,password:e.target.value})}}
              />
            </Form.Group>
          </Row>
          <Button onClick={submit}>Bejelentkezés</Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
