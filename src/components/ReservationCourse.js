import React, { useState, useEffect } from "react";
import axios from './axios-interceptor';

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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

const ReservationCourse = ({ user }) => {
  const [availabilities, setAvailabilities] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [reservedAvailability, setReservedAvailability] = useState(null);

  useEffect(() => {
    // Appeler le backend pour récupérer les disponibilités des professeurs
    axios
      .get("http://localhost:8082/api/auth/availabilities/all")
      .then((response) => {
        setAvailabilities(response.data);
        console.log("Availabilities:", response.data);
      })
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération des disponibilités :",
          error
        )
      );

    // Appeler le backend pour récupérer les matières
    axios
      .get("http://localhost:8082/api/auth/subjects")
      .then((response) => setAvailableSubjects(response.data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des matières :", error)
      );
  }, []);

  const handleReservation = (availability) => {
    console.log("Réservation pour le créneau :", availability);

    if (user && user.id) {
      // Appeler le backend pour effectuer la réservation
      axios
        .post(
          `http://localhost:8082/api/auth/courses/${user.id}/${availability.availabilityId}/create`,
          {}
        )
        .then((response) => {
          console.log("Cours créé avec succès :", response.data);
          // Mettez à jour l'état ou effectuez d'autres actions nécessaires ici
          // Mettez à jour l'état reservedAvailability
          setReservedAvailability(availability);

          // Filtrer les availabilities pour exclure celle qui vient d'être réservée
          setAvailabilities(availabilities.filter(avail => avail !== availability));
        })
        .catch((error) =>
          console.error("Erreur lors de la création du cours :", error)
        );
    } else {
      console.error("L'utilisateur n'est pas correctement défini.");
    }
  };

  const filteredAvailabilities = availabilities
    .filter((availability) =>
      selectedSubject ? availability.subjects.includes(selectedSubject) : true
    )
    .filter((availability) =>
      selectedDate ? availability.day === selectedDate : true
    );

  return (
    <Container style={{ marginTop: "16px", marginBottom: "16px" }}>
      <Box>
        <Typography variant="h6">Réserver un cours :</Typography>
        {/* Filtres */}
        <Box>
          <FormControl style={{ minWidth: 120, marginRight: 16 }}>
            <InputLabel>Matière</InputLabel>
            <Select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              {availableSubjects.map((subject, index) => (
                <MenuItem key={index} value={subject.name}>
                  {subject.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            id="date"
            label="Date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ minWidth: 120, marginRight: 16 }}
          />
        </Box>

        {/* Tableau des disponibilités filtré */}
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
            {filteredAvailabilities.map((availability) => (
              <TableRow key={availability.availabilityId}>
                <TableCell>{`${availability.teacherFirstname} ${availability.teacherLastname}`}</TableCell>
                <TableCell>{availability.subjects}</TableCell>
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
