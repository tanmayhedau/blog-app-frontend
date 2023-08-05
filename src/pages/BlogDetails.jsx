import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Box, InputLabel, TextField, Typography, Button } from "@mui/material";
import toast from "react-hot-toast";


const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const [inputs, setInputs] = useState({});

  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/blog/blog/${id}`
      );
      console.log({ data });
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image
        })
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetail();

  }, [id]);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/blog/update-blog/${id}`,
        {
          title: inputs.title,
          description: inputs.description,
          image: inputs.image,
          user: id,
        }
      );

      if (data?.success) {
        toast.success("blog updated");
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
            Update a Post
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
            color="warning"
            style={{ height: "40px" }}>
            Update
          </Button>
        </Box>
      </form>
    </>
  );
};

export default BlogDetails;
