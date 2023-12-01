import React from "react";
import ParentSpace from "./ParentSpace";
import TeacherSpace from "./TeacherSpace";
import { Container } from "@mui/material";

export default function UserSpace({ user }) {
  return (
    <Container>
      {user.roles[0].name === "PARENT" && <ParentSpace user={user} />}
      {user.roles[0].name === "TEACHER" && <TeacherSpace user={user} />}
    </Container>
  );
}