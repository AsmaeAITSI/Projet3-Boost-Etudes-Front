import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Login(props) {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" }); // États pour gérer les erreurs
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });

    // Réinitialisez les erreurs lorsque l'utilisateur commence à saisir
    setErrors({ ...errors, [name]: "" });
  };

  const handleLogin = async () => {
    // Réinitialisez les erreurs
    setErrors({ username: "", password: "" });

    // Vérifiez si les champs sont vides
    if (!credentials.username) {
      setErrors({ ...errors, username: "Veuillez saisir votre identifiant." });
      return;
    }

    if (!credentials.password) {
      setErrors({ ...errors, password: "Veuillez saisir votre mot de passe." });
      return;
    }

    try {
      const response = await fetch("http://localhost:8082/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.status === 200) {
        const user = await response.json();
        props.setUser(user);
        props.setIsAuthenticated(true);
        navigate("/profile");
      } else {
        // Gérer les erreurs ici, par exemple, afficher un message d'erreur à l'utilisateur.
        setErrors({ username: "Identifiant et/ou mot de passe incorrects." });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      // Gérer les erreurs ici, par exemple, afficher un message d'erreur à l'utilisateur.
      setErrors({ username: "Une erreur s'est produite lors de la connexion." });
    }
  };

  return (
    <Card className="login-page">
      <Card.Header className="text-center">Authentification</Card.Header>
      <Card.Body>
        {errors.username && <Alert variant="danger">{errors.username}</Alert>}
        {errors.password && <Alert variant="danger">{errors.password}</Alert>}
        <Form>
          <Form.Group>
            <Form.Label>Identifiant</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleLogin}>
            Connexion
          </Button>
          <Button
            variant="link"
            onClick={() => navigate("/signup")}
          >
            Vous n'avez pas de compte ? Inscrivez-vous ici.
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
