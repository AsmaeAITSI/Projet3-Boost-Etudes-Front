import React, { useState } from "react";
import ParentSignup from "./ParentSignup.js";
import StudentSignup from "./StudentSignup";
import TeacherSignup from "./TeacherSignup.js";
import { Form } from "react-bootstrap";

export default function Signup() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="content">
      <Form.Group>
        <Form.Check
          type="radio"
          label="Je suis parent"
          name="userType"
          checked={selectedOption === "parent"}
          onChange={() => handleOptionChange("parent")}
        />
      </Form.Group>
      <Form.Group>
        <Form.Check
          type="radio"
          label="Je suis étudiant"
          name="userType"
          checked={selectedOption === "student"}
          onChange={() => handleOptionChange("student")}
        />
      </Form.Group>
      <Form.Group>
        <Form.Check
          type="radio"
          label="Je suis enseignant"
          name="userType"
          checked={selectedOption === "teacher"}
          onChange={() => handleOptionChange("teacher")}
        />
      </Form.Group>

      {selectedOption === "parent" && <ParentSignup />}
      {selectedOption === "student" && <StudentSignup />}
      {selectedOption === "teacher" && <TeacherSignup />}
    </div>
  );
}
