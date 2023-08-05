import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";



const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(inputs)
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/user/register`,
        {
          username: inputs.name,
          email: inputs.email,
          password: inputs.password,
        }
      );

      if (data.success) {
        toast.success("user registered successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display="flex"
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
          marginTop={2}
          boxShadow={"10px 10px 20px #ccc"}
          padding={3}
          borderRadius={5}>
          <Typography variant="h4" padding={3} textAlign={"center"}>
            REGISTER
          </Typography>
          <TextField
            placeholder="name"
            name="name"
            margin="normal"
            type="text"
            required
            value={inputs.name}
            onChange={handleChange}
          />
          <TextField
            placeholder="email"
            name="email"
            margin="normal"
            type="email"
            required
            value={inputs.email}
            onChange={handleChange}
          />
          <TextField
            placeholder="password"
            name="password"
            margin="normal"
            type="password"
            required
            value={inputs.password}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ borderRadius: 3, marginTop: 1 }}>
            Submit
          </Button>

          <Button
            type="submit"
            color="primary"
            sx={{ borderRadius: 3, marginTop: 1 }}
            onClick={() => navigate("/login")}>
            Already Registered ? Please Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
