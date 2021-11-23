import React, { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import { Confirm, Button, Loader } from "semantic-ui-react";
import styled from "styled-components";
//Router.push
const Note = ({ note }) => {
  console.log(note);
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const open = () => {
    setConfirm(true);
  };
  const close = () => {
    setConfirm(false);
  };

  const deleteNote = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/notes/${note._id}`);
      // setIsDeleting(false); //a diferencia de cuando uso context_api, aca no es necesario hacer esto, ya que me va a redireccionar y cuand vuelva a mostrar este componente isDeleting va a ser false por default
      Router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isDeleting) {
      deleteNote();
    } else {
      return;
    }
  }, [isDeleting]);

  const handleDelete = () => {
    setIsDeleting(true);
    close();
  };

  return (
    <Wrapper>
      <div className='note-container'>
        {isDeleting ? (
          <Loader active />
        ) : (
          <>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <Button color='red' onClick={open}>
              Delete
            </Button>
          </>
        )}
        <Confirm open={confirm} onCancel={close} onConfirm={handleDelete} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section``;

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

export default Note;
