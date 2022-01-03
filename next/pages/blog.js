import Head from "next/head";
import styles from "../styles/Blog.module.css";

export default function Blog({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>
          Blog - Escallo | Revolucione sua área de atendimento ao cliente
        </title>
        <meta
          name="description"
          content="O Blog Escallo tem o objetivo de informar sobre atendimento ao cliente, gestão, tecnologia e inovação. Acompanhe nossos conteúdos e revolucione seu negócio"
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
  const res = await fetch(process.env.NEXT_PUBLIC_STRAPI_URL + "/api/posts");
  const posts = await res.json();
  return {
    props: {
      posts: posts.data.map(({ id, attributes }) => ({ id, ...attributes })),
    },
    revalidate: 1,
  };
}
