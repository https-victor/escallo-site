import { formatStrapiArray, formatStrapiObject } from "../functions/formatters";
import AppContext from "../context/AppContext";
import qs from "qs";
import Head from "next/head";
import Footer from "../components/footer/Footer";
import Banners from "../components/banners/Banners";
import Header from "../components/header/Header";
import styles from "../styles/home.module.css";

export default function Home(props) {
  const segmentos = formatStrapiArray(props.segmentos);
  const banners = formatStrapiArray(props.banners);
  console.log(props);
  const logoImage = formatStrapiObject(props.logo);
  return (
    <AppContext.Provider
      value={{
        logoImage,
        subtitulo_logo: props.subtitulo_logo,
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

          <div className={styles.grid}></div>
        </main>

        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export async function getStaticProps() {
  const homepageQuery = qs.stringify(
    {
      populate: ["cta", "logo", "demo_image", "demo_hero_image"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const homepageRes = await fetch(
    "http://localhost:1337/api/homepage?" + homepageQuery
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
    "http://localhost:1337/api/banners?" + bannersQuery
  );
  const banners = await bannersRes.json();

  const segmentosQuery = qs.stringify(
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
  const segmentosRes = await fetch(
    "http://localhost:1337/api/segmentos?" + segmentosQuery
  );
  const segmentos = await segmentosRes.json();

  return {
    props: { ...homepageData.data.attributes, banners, segmentos },
    revalidate: 1,
  };
}
