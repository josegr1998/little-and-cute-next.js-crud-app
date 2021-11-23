import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import styled from "styled-components";
import Link from "next/link";
import axios from "axios";
import { Button, Card } from "semantic-ui-react";

export default function Home({ notes }) {
  console.log(notes);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Wrapper>
        <div className='notes-container'>
          <h1>notes</h1>
          <div className='grid wrapper'>
            {notes.data.map((note) => {
              return (
                <div key={note._id}>
                  <Card>
                    <Card.Content>
                      <Card.Header>
                        <Link href={`/${note._id}`}>
                          <span>{note.title}</span>
                        </Link>
                      </Card.Header>
                    </Card.Content>
                    <Card.Content extra>
                      <Link href={`/${note._id}`}>
                        <Button primary>View</Button>
                      </Link>
                      <Link href={`/${note._id}/edit`}>
                        <Button primary>Edit</Button>
                      </Link>
                    </Card.Content>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.main``;

export const getStaticProps = async () => {
  const response = await axios.get("http://localhost:3000/api/notes");
  console.log(response.data);

  return { props: { notes: response.data } };
};
