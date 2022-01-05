import { formatStrapiArray, formatStrapiObject } from "../functions/formatters";
import AppContext from "../context/AppContext";
import qs from "qs";
import Head from "next/head";
import Footer from "../components/footer/Footer";
import Banners from "../components/banners/Banners";
import Header from "../components/header/Header";
import styles from "../styles/home.module.scss";
import Segmentos from "../components/segmentos/Segmentos";
import parseToHtml from "html-react-parser";

export default function Home(props) {
  console.log(props);
  const segmentos = formatStrapiArray(props.segmentos);
  const banners = formatStrapiArray(props.banners);
  const logoImage = formatStrapiObject(props.logo);

  const demoImage = formatStrapiObject(props.demo_image);
  const demoHeroImage = formatStrapiObject(props.demo_hero_image);

  const resultadosHeroHappy = formatStrapiObject(props.resultados_hero_happy);
  const resultadosArrow = formatStrapiObject(props.resultados_arrow);
  return (
    <AppContext.Provider
      value={{
        logoImage,
        subtitulo_logo: props.subtitulo_logo,
        segmentos_titulo: props.segmentos_titulo,
        segmentos_cta: props.segmentos_cta,
      }}
    >
      <div>
        <Head>
          <title>{props.titulo}</title>
          <meta name="description" content={props.description} />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />

        <main className={styles.main}>
          <Banners data={banners} />

          <Segmentos data={segmentos} />

          <section className={styles.demo}>
            <div className={styles.container}>
              <h2>{props.demo_titulo}</h2>
              <h3>{parseToHtml(props.demo_subtitulo)}</h3>
              <img src={process.env.NEXT_PUBLIC_STRAPI_URL + demoImage.url} />
            </div>

            <div className={styles.container2}>
              <img
                src={process.env.NEXT_PUBLIC_STRAPI_URL + demoHeroImage.url}
              />
              <a
                href={props.demo_cta.link}
                target={"_blank"}
                className={styles.cta}
              >
                {props.demo_cta.texto}
              </a>
            </div>
          </section>

          <section className={styles.resultados}>
            <h2>{props.resultados_titulo}</h2>
            <div className={styles.resultadosWrapper}>
              <div className={styles.resultadosHeroWrapper}>
                <img
                  src={
                    process.env.NEXT_PUBLIC_STRAPI_URL + resultadosHeroHappy.url
                  }
                />
                <p>{parseToHtml(props.resultados_descricao)}</p>
              </div>
              <ul className={styles.resultadosContainer}>
                {props.resultados.map((resultado) => {
                  const icon = formatStrapiObject(resultado.icon);
                  return (
                    <li key={resultado.id}>
                      <img
                        src={process.env.NEXT_PUBLIC_STRAPI_URL + icon.url}
                      />
                      <img
                        src={
                          process.env.NEXT_PUBLIC_STRAPI_URL +
                          resultadosArrow.url
                        }
                      />
                      <p className={styles.number}>{resultado.numero}</p>
                      <img
                        src={
                          process.env.NEXT_PUBLIC_STRAPI_URL +
                          resultadosArrow.url
                        }
                      />
                      <p>{resultado.descricao}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
            <p>{props.resultados_between_the_lines}</p>
            <div className={styles.resultados_divider}></div>
          </section>

          <section className={styles.blog}>
            <h2>{props.blog_titulo}</h2>
            <h3>{parseToHtml(props.blog_subtitulo)}</h3>
          </section>
        </main>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export async function getStaticProps() {
  const homepageQuery = qs.stringify(
    {
      populate: [
        "demo_cta",
        "logo",
        "demo_image",
        "resultados_hero_happy",
        "resultados.icon",
        "resultados_arrow",
        "segmentos_cta",
        "demo_hero_image",
      ],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const homepageRes = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_URL + "/api/homepage?" + homepageQuery
  );
  const homepageData = await homepageRes.json();

  const bannersQuery = qs.stringify(
    {
      populate: [
        "cta",
        "social_media.icon",
        "hero_image",
        "background.background_image",
      ],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const bannersRes = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_URL + "/api/banners?" + bannersQuery
  );
  const banners = await bannersRes.json();

  const segmentosQuery = qs.stringify(
    {
      populate: ["button.image", "button.image_active", "video", "logo"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const segmentosRes = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_URL + "/api/segmentos?" + segmentosQuery
  );
  const segmentos = await segmentosRes.json();

  const postsQuery = qs.stringify(
    {
      populate: [
        "cover",
        "author",
        "content",
        "content.imagem",
        "content.video",
        "cover",
      ],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const postsRes = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_URL + "/api/posts?" + postsQuery
  );
  const posts = await postsRes.json();
  return {
    props: { ...homepageData.data.attributes, banners, segmentos, posts },
    revalidate: 1,
  };
}
