import React, { useState , useEffect} from "react";
import axios from "axios";
import { TextField, Button, Typography, Container, Box, Table, TableHead, TableBody, TableRow, TableCell} from "@mui/material";



const Availability = ({ user }) => {
  const currentDate = new Date();
  const currentDay = currentDate.toISOString().split("T")[0];
  const currentHour = currentDate.getHours().toString().padStart(2, "0");
  const currentMinute = currentDate.getMinutes().toString().padStart(2, "0");
  

  const [day, setDay] = useState(currentDay);
  const [startTime, setStartTime] = useState(`${currentHour}:${currentMinute}`);
  const [endTime, setEndTime] = useState(`${currentHour }:${currentMinute}`);
  const [message, setMessage] = useState("");
  const [availabilities, setAvailabilities] = useState([]);

  


  useEffect(() => {

    if (user.id) {
      axios.get(`http://10.200.0.12:8082/api/auth/${user.id}/availabilities`)
        .then(response => setAvailabilities(response.data))
        .catch(error => console.error("Erreur lors de la récupération des disponibilités :", error));
    }
  }, [user.id]);


  const handleStartTimeChange = (e) => {
    const newStartTime = e.target.value;
    setStartTime(newStartTime);

    
    const [startHour, startMinute] = newStartTime.split(":");
    const endHour = (parseInt(startHour) + 2).toString().padStart(2, "0");
    const endMinute = startMinute;
    setEndTime(`${endHour}:${endMinute}`);
  };

  const handleAddAvailability = async () => {
    try {
      // Obtenez la date et l'heure actuelles
      const currentTime = currentDate.toTimeString().split(' ')[0];
  
      
      const formattedInputDate = `${day}T${startTime}`;
      
      
      if (formattedInputDate >= `${currentDay}T${currentTime}`) {
       
        if (startTime < endTime) {
          const newAvailability = {
            day: day,
            startTime: startTime,
            endTime: endTime,
          };
  
          await axios.post(
            `http://10.200.0.12:8082/api/auth/${user.id}/availability`,
            newAvailability
          );
          setAvailabilities([...availabilities, newAvailability]);
  
          setMessage("Disponibilité ajoutée avec succès");
          // Réinitialiser les champs après l'ajout réussi
          setDay(currentDay);
          setStartTime(`${currentHour}:${currentMinute}`);
          setEndTime(`${currentHour}:${currentMinute}`);
        } else {
          setMessage("L'heure de fin doit être postérieure à l'heure de début.");
        }
      } else {
        setMessage("Vous ne pouvez pas enregistrer une disponibilité antérieure à la date actuelle.");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la disponibilité :", error);
      setMessage(
        "Une erreur s'est produite lors de l'ajout de la disponibilité"
      );
    }
  };

  return (
    <Container style={{ marginTop: "16px", marginBottom: "16px" }}>
      <Box>
        <Typography variant="h6">Ajouter une disponibilité :</Typography>
        <div style={{ marginBottom: "8px" }}>
        <div style={{ display: "flex", marginBottom: "8px" }}>
            <div style={{ flex: 1 }}>
              <TextField
                label="Jour"
                type="date"
                variant="outlined"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              />
            </div>
            <div style={{ flex: 1, marginLeft: "8px" }}>
              <TextField
                label="Heure de début"
                type="time"
                variant="outlined"
                value={startTime}
                onChange={handleStartTimeChange}
                inputProps={{
                  step: 300, // 300 seconds = 5 minutes
                }}
              />
            </div>
            <div style={{ flex: 1, marginLeft: "8px" }}>
              <TextField
                label="Heure de fin"
                type="time"
                variant="outlined"
                value={endTime}
                disabled
              />
            </div>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddAvailability}
          >
            Ajouter Disponibilité
          </Button>
        </div>
        <Typography>{message}</Typography>
        <Typography variant="h6">Vos disponibilités :</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Jour</TableCell>
              <TableCell>Heure de début</TableCell>
              <TableCell>Heure de fin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {availabilities.map((availability, index) => (
            <TableRow key={index}>
              <TableCell>{availability.day}</TableCell>
              <TableCell>{availability.startTime}</TableCell>
              <TableCell>{availability.endTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </Box>
    </Container>
  );
};

export default Availability;
