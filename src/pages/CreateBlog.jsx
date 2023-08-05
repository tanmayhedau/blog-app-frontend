import React, { useState } from "react";
import { Box, InputLabel, TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const CreateBlog = () => {
  const id = localStorage.getItem("userId")
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(inputs);
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/blog/create-blog`,
        {
          title: inputs.title,
          description: inputs.description,
          image: inputs.image,
          user: id,
        }
      );

      if (data?.success) {
        toast.success("blog created");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          border={3}
          borderRadius={10}
          padding={2}
          margin={"auto"}
          boxShadow={"10px 10px 20px #ccc"}
          display={"flex"}
          flexDirection={"column"}
          marginTop={"30px"}
          width={"40%"}>
          <Typography
            variant="h5"
            textAlign={"center"}
            fontWeight={"bold"}
            color={"gray"}
            padding={0}>
            Create a Post
          </Typography>
          <InputLabel
            sx={{ mb: 0, mt: 0, fontSize: "16px", fontWeight: "bold" }}>
            Title
          </InputLabel>
          <TextField
            value={inputs.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            name="title"
            required
          />
          <InputLabel
            sx={{ mb: 0, mt: 0, fontSize: "16px", fontWeight: "bold" }}>
            Description
          </InputLabel>
          <TextField
            value={inputs.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            name="description"
            required
          />
          <InputLabel
            sx={{ mb: 0, mt: 0, fontSize: "16px", fontWeight: "bold" }}>
            Image URL
          </InputLabel>
          <TextField
            value={inputs.image}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            name="image"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ height: "40px" }}>
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog;
