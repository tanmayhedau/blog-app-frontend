import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import  toast  from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/user/login`,
        {
          email: inputs.email,
          password: inputs.password,
        }
      );

      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());

        toast.success("user login successfully");
        navigate("/blogs");
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
            LOGIN
          </Typography>

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
            Login
          </Button>

          <Button
            type="submit"
            color="primary"
            sx={{ borderRadius: 3, marginTop: 1 }}
            onClick={() => navigate("/register")}>
            Create account here !
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
