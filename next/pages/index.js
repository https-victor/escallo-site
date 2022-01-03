import { formatStrapiArray, formatStrapiObject } from "../functions/formatters";
import AppContext from "../context/AppContext";
import qs from "qs";
import Head from "next/head";
import Footer from "../components/footer/Footer";
import Banners from "../components/banners/Banners";
import Header from "../components/header/Header";
import styles from "../styles/home.module.scss";
import Segmentos from "../components/segmentos/Segmentos";

export default function Home(props) {
  const segmentos = formatStrapiArray(props.segmentos);
  const banners = formatStrapiArray(props.banners);
  const logoImage = formatStrapiObject(props.logo);
  console.log(props);
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
        "cta",
        "logo",
        "demo_image",
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

  return {
    props: { ...homepageData.data.attributes, banners, segmentos },
    revalidate: 1,
  };
}
