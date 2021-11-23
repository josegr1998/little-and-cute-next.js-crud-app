import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Form, Loader } from "semantic-ui-react";
import Router from "next/router";
import styled from "styled-components";
import axios from "axios";
import { set } from "mongoose";

//en este componente seria util tener un estado global para no tener que buscar el id

const EditNote = ({ note }) => {
  const [form, setForm] = useState({
    title: note.title,
    description: note.description,
  });
  console.log(note);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  // const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();

    if (Object.keys(err).length < 1) {
      try {
        setIsSubmitting(true);
        const response = await axios.patch(
          `http://localhost:3000/api/notes/${note._id}`,
          form
        );
        setIsSubmitting(false);
        setForm({ title: "", description: "" });
        setErrors({});
        Router.push("/");
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrors(err);
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let err = {};
    if (!form.title) {
      err.title = "Title is Required";
    }
    if (!form.description) {
      err.description = "Description is required";
    }
    return err;
  };

  return (
    <Wrapper>
      <div className='form-container'>
        <h1>
          Edit Note
          <div>
            {isSubmitting ? (
              <Loader active inline='center' />
            ) : (
              <Form onSubmit={handleSubmit}>
                {errors.title && <h2>Please enter title</h2>}
                <Form.Input
                  fluidlabel='Title'
                  label='Title'
                  placeholder='Title'
                  name='title'
                  value={form.title}
                  onChange={handleChange}
                />
                {errors.description && <h2>Please enter description</h2>}
                <Form.TextArea
                  fluid
                  label='Description'
                  placeholder='Description'
                  name='description'
                  value={form.description}
                  onChange={handleChange}
                />
                <Button type='submit'>Edit</Button>
              </Form>
            )}
          </div>
        </h1>
      </div>
    </Wrapper>
  );
};

export const getStaticPaths = async () => {
  const response = await fetch("http://localhost:3000/api/notes");

  const data = await response.json();

  const paths = data.data.map((item) => {
    return {
      params: { id: item._id.toString() }, //should be a string
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const response = await axios.get(`http://localhost:3000/api/notes/${id}`);

  const data = response.data;

  console.log(data);

  return {
    props: { note: data.data },
  };
};

const Wrapper = styled.section`
  .form-container {
    width: 400px;
    margin: 20px auto;
  }
`;
export default EditNote;
