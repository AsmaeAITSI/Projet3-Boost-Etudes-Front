// ParentSpace.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Button, TextField, Stack } from "@mui/material";
import { useNavigate } from 'react-router-dom';


const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: "100vh",
    padding: "20px",
  },
  element: {
    margin: "10px 0",
  },
};



export default function ParentSpace({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    birthdate: user.birthdate,
    adresse: user.adresse,
    city: user.city,
    mobile: user.mobile,
    email: user.email,
    profession: "",
  });
  const [additionalInfo, setAdditionalInfo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user.roles[0].name === "PARENT") {
      axios
        .get(`http://localhost:8082/api/auth/parents/${user.id}`)
        .then((response) => {
          setAdditionalInfo(response.data.profession || "");
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données du parent :", error);
        });
    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);

    if (user.roles[0].name === "PARENT") {
      setFormData({
        ...formData,
        profession: additionalInfo || "",
      });
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);

    setFormData({
      firstname: user.firstname,
      lastname: user.lastname,
      birthdate: user.birthdate,
      adresse: user.adresse,
      city: user.city,
      mobile: user.mobile,
      email: user.email,
      profession: additionalInfo || "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Handle the submit logic for a parent
      await axios.put(`http://localhost:8082/api/auth/update/${user.id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsEditing(false);
      setFormData({
        ...formData,
        firstname: formData.firstname, // Mettez à jour avec le nouveau prénom
        lastname: formData.lastname, // Mettez à jour avec le nouveau nom de famille
        email: formData.email, // Mettez à jour avec le nouveau email
        profession: formData.profession, // Mettez à jour avec la nouvelle profession
        // Mettez à jour les autres champs de données ici
      });
      setAdditionalInfo(formData.profession);
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
    }
  };

  const handleReservationClick = () => {
    navigate("/reservation-course");
    
  };

  const handleShowMyCoursesClick = () => {
    navigate("/my-courses")
  };

  return (
    <Container sx={styles.container}>
      <Stack direction="row" spacing={2} sx={styles.element}>
        <Button variant="contained" onClick={handleEditClick}>
          Modifier
        </Button>
        <Button variant="contained" onClick={handleReservationClick}>
          Réserver un cours
        </Button>
        <Button variant="contained" onClick={handleShowMyCoursesClick}>
          Afficher mes cours
        </Button>
      </Stack>
      <Typography variant="h4">Profil de {formData.firstname} {formData.lastname}</Typography>

      {isEditing ? (
        <>
          <TextField
            sx={styles.element}
            label="Prénom"
            variant="outlined"
            fullWidth
            value={formData.firstname}
            onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
          />
          <TextField
            sx={styles.element}
            label="Nom de famille"
            variant="outlined"
            fullWidth
            value={formData.lastname}
            onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
          />
          <TextField
            sx={styles.element}
            label="Email"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {user.roles[0].name === "PARENT" && (
            <TextField
              sx={styles.element}
              label="Profession"
              variant="outlined"
              fullWidth
              value={formData.profession}
              onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
            />
          )}

          <Button onClick={handleSubmit} variant="contained" color="primary">
            Enregistrer
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h6">Informations personnelles :</Typography>
          <Typography variant="body1" sx={styles.element}>
            <strong>Compte :</strong> {user.roles[0].name}
          </Typography>
          <Typography variant="body1" sx={styles.element}>
            <strong>Date de naissance :</strong> {user.birthdate}
          </Typography>
          <Typography variant="body1" sx={styles.element}>
            <strong>Adresse :</strong> {user.adresse}
          </Typography>
          <Typography variant="body1" sx={styles.element}>
            <strong>Ville :</strong> {user.city}
          </Typography>
          <Typography variant="body1" sx={styles.element}>
            <strong>Téléphone mobile :</strong> {user.mobile}
          </Typography>
          <Typography variant="body1" sx={styles.element}>
            <strong>Email :</strong> {formData.email}
          </Typography>
          {user.roles[0].name === "PARENT" && (
            <Typography variant="body1" sx={styles.element}>
              <strong>Profession :</strong> {additionalInfo}
            </Typography>
          )}
        </>
      )}
    </Container>
  );
}
