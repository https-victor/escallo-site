import qs from "qs";
export default function Post({ post }) {
  console.log(post);
  if (post.error) {
    return (
      <article>
        <h2>Post não encontrado</h2>
      </article>
    );
  }
  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </article>
  );
}

export async function getStaticPaths() {
  const res = await fetch("http://localhost:1337/api/posts");
  const posts = await res.json();

  const paths = posts.data.map((post) => ({
    params: { slug: post.attributes.slug, id: post.id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}
export async function getStaticProps({ params }) {
  const { slug } = params;
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch("http://localhost:1337/api/posts?" + query);
  const data = await res.json();
  //   const post = { id: data.data.id, ...data.data.attributes };
  if (data.data[0]) {
    return {
      props: {
        post: {
          id: data.data[0].id,
          ...data.data[0].attributes,
        },
      },
    };
  }

  return {
    props: {
      post: {
        error: {
          status: 404,
          message: "Post não encontrado",
          details: {},
        },
      },
    },
  };
}
