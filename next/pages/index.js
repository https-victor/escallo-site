import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Escallo | Plataforma Completa de Atendimento Multicanal</title>
        <meta
          name="description"
          content="A plataforma de atendimento multicanal, que vai te ajudar a atender o cliente de forma rápida e ágil, além de gerir estrategicamente o seu Contact Center"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <div className={styles.grid}>
          {posts.map((post) => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:1337/api/posts");
  const posts = await res.json();
  return {
    props: {
      posts: posts.data.map(({ id, attributes }) => ({ id, ...attributes })),
    },
    revalidate: 1,
  };
}
