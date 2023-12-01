import React, { useState, useEffect } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function TeacherSignup() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    adresse: "",
    city: "",
    mobile: "",
    birthdate: "",
    profession: "",
    password: "",
    confirmPassword: "",
    subjects:[],
    
  });

  const [availableSubjects, setAvailableSubjects] = useState([]);

  const [errors, setErrors] = useState({});
  const [accountCreated, setAccountCreated] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch("http://localhost:8082/api/auth/subjects");
        if (response.ok) {
          const subjects = await response.json();
          setAvailableSubjects(subjects);
        } else {
          console.error("Failed to fetch subjects");
        }
      } catch (error) {
        console.error("Error during subject fetch:", error);
      }
    };

    fetchSubjects();
  }, []);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (name === "subjects") {
      // Si le champ est une checkbox, gérer la mise à jour du tableau des matières enseignées
      setFormData((prevData) => ({
        ...prevData,
        subjects: checked
          ? [...prevData.subjects, value]
          : prevData.subjects.filter((subject) => subject !== value),
      }));
    } else {
      // Pour les autres champs, traiter normalement
      setFormData((prevData) => ({ ...prevData, [name]: type === "checkbox" ? checked : value }));
    }
    // Réinitialisez les erreurs lorsque l'utilisateur commence à saisir
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validez les données du formulaire ici (par exemple, assurez-vous que le mot de passe et la confirmation correspondent)

    // Si les données sont valides, vous pouvez soumettre le formulaire
    // Sinon, mettez à jour les erreurs dans l'état `errors`

    if (formData.password !== formData.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: "Les mots de passe ne correspondent pas.",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:8082/api/auth/teacher/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        // L'inscription a réussi, vous pouvez rediriger l'utilisateur vers une page de confirmation ou de connexion
        setAccountCreated(true);
        
      } else {
        // Gérer les erreurs ici, par exemple, afficher un message d'erreur à l'utilisateur.
        const errorData = await response.json();
        setErrors(errorData);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // Gérer les erreurs ici, par exemple, afficher un message d'erreur à l'utilisateur.
      setErrors({ message: "Une erreur s'est produite lors de l'inscription." });
    }
  };

  return (
    <Card>
      <Card.Header className="text-center">Inscription Enseignant</Card.Header>
      <Card.Body>
      {errors.confirmPassword && (
          <Alert variant="danger">{errors.confirmPassword}</Alert>
        )}
        {errors.message && <Alert variant="danger">{errors.message}</Alert>}
        {accountCreated ? (
          <Alert variant="success">
            Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.
          </Alert>
        ) : (
            
        
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Nom de famille</Form.Label>
            <Form.Control
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Adresse</Form.Label>
            <Form.Control
              type="text"
              name="adresse"
              value={formData.adresse}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Ville</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date de naissance</Form.Label>
            <Form.Control
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Profession</Form.Label>
            <Form.Control
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirmation de mot de passe</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group>
              <Form.Label>Matières enseignées</Form.Label>
              <div>
                {availableSubjects.map((subject) => (
                  <Form.Check
                    key={subject.subjectId}
                    type="checkbox"
                    id={subject.name}
                    label={subject.name}
                    name="subjects"
                    value={subject.name}
                    onChange={handleInputChange}
                  />
                ))}
              </div>
            </Form.Group>
          
          <Button className="inscription-button" variant="primary" type="submit">
            S'inscrire
          </Button>
        </Form>
        )}
      </Card.Body>
    </Card>
  );
}
