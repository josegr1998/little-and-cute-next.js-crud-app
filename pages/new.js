import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Form, Loader } from "semantic-ui-react";
import Router from "next/router";
import styled from "styled-components";
import axios from "axios";
import { set } from "mongoose";

const New = () => {
  const [form, setForm] = useState({ title: "", description: "" });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  // const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();

    if (Object.keys(err).length < 1) {
      try {
        setIsSubmitting(true);
        const response = await axios.post(
          "http://localhost:3000/api/notes",
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
          Create Note
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
                  onChange={handleChange}
                />
                {errors.description && <h2>Please enter description</h2>}
                <Form.TextArea
                  fluid
                  label='Description'
                  placeholder='Description'
                  name='description'
                  onChange={handleChange}
                />
                <Button type='submit'>Create</Button>
              </Form>
            )}
          </div>
        </h1>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-container {
    width: 400px;
    margin: 20px auto;
  }
`;
export default New;
