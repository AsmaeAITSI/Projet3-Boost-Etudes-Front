import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Typography,
  Container,
  Box,
} from "@mui/material";

const ReservationCourse = () => {
  const [availabilities, setAvailabilities] = useState([]);

  useEffect(() => {
    // Appeler le backend pour récupérer les disponibilités des professeurs
    axios.get("http://localhost:8082/api/auth/availabilities/all")
      .then((response) => setAvailabilities(response.data))
      .catch((error) => console.error("Erreur lors de la récupération des disponibilités :", error));
  }, []);

  const handleReservation = (availability) => {
    // Ajoutez la logique de réservation ici, par exemple, une requête au backend
    console.log("Réservation pour le créneau :", availability);
  };

  return (
    <Container style={{ marginTop: "16px", marginBottom: "16px" }}>
      <Box>
        <Typography variant="h6">Réserver un cours :</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Professeur</TableCell>
              <TableCell>Matière</TableCell>
              <TableCell>Jour</TableCell>
              <TableCell>Heure de début</TableCell>
              <TableCell>Heure de fin</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {availabilities.map((availability) => (
              <TableRow key={availability.availabilityId}>
                <TableCell>{`${availability.teacherFirstname} ${availability.teacherLastname}`}</TableCell>
                <TableCell>{availability.subject}</TableCell>
                <TableCell>{availability.day}</TableCell>
                <TableCell>{availability.startTime}</TableCell>
                <TableCell>{availability.endTime}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleReservation(availability)}
                  >
                    Réserver
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
};

export default ReservationCourse;
