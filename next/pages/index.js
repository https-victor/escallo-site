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
import { Formik } from "formik";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import ReactPlayer from "react-player";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import Contato from "../components/forms/Contato";
import Newsletter from "../components/forms/Newsletter";
import useModal from "../hooks/useModal";

export default function Home(props) {
  console.log(props);
  const escalloLogo = formatStrapiObject(props.escallo_logo);
  const escalloLogoSmall = formatStrapiObject(props.escallo_logo_small);
  const segmentos = props.segmentos;
  const posts = props.posts.slice(0, 3);
  const banners = props.banners;
  const materiais = props.materiais.slice(0, 4);
  const logoImage = formatStrapiObject(props.logo);

  const demoImage = formatStrapiObject(props.demo_image);
  const demoHeroImage = formatStrapiObject(props.demo_hero_image);

  const resultadosHeroHappy = formatStrapiObject(props.resultados_hero_happy);
  const resultadosArrow = formatStrapiObject(props.resultados_arrow);

  const futurotecLogo = formatStrapiObject(props.futurotec_logo);
  const materiaisImage = formatStrapiObject(props.materiais_image);

  const meLigueModal = useModal();

  const videoModal = useModal(null);

  const formModal = useModal();
  return (
    <AppContext.Provider
      value={{
        logoImage,
        subtitulo_logo: props.subtitulo_logo,
        segmentos_titulo: props.segmentos_titulo,
        escalloLogo,
        menu: props.menu,
        escalloLogoSmall,
        meLigueModal,
        formModal,
        redesSociais: props.redes_sociais,
        futurotecLogo,
        endereco: props.endereco,
        segmentos_cta: props.segmentos_cta,
      }}
    >
      <div className={styles.page}>
        <Head>
          <title>{props.titulo}</title>
          <meta name="description" content={props.description} />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
            integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
            crossorigin="anonymous"
          />
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
              <div onClick={formModal.onShow} className={styles.cta}>
                {props.demo_cta.texto}
              </div>
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
                        className={styles.arrowImg}
                        src={
                          process.env.NEXT_PUBLIC_STRAPI_URL +
                          resultadosArrow.url
                        }
                      />
                      <p className={styles.number}>{resultado.numero}</p>
                      <img
                        className={styles.arrowImg}
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
            <div className={styles.artigosWrapper}>
              <h2>{props.blog_titulo}</h2>
              <h3>{parseToHtml(props.blog_subtitulo)}</h3>
              <div className={styles.artigos}>
                {posts.map((post) => {
                  const cover = formatStrapiObject(post.cover);
                  return (
                    <div key={post.id} className={styles.artigo}>
                      <img
                        src={process.env.NEXT_PUBLIC_STRAPI_URL + cover.url}
                      />
                      <div className={styles.descriptionWrapper}>
                        <p>{post.title}</p>
                      </div>
                    </div>
                  );
                })}
                {/* {posts.map((post) => {
                  // const cover = formatStrapiObject(post.cover);
                  return (
                    <a
                      target="_blank"
                      href={post.link}
                      key={post.id}
                      className={styles.artigo}
                    >
                      <img
                        src={post._embedded["wp:featuredmedia"][0].source_url}
                      />
                      <div className={styles.descriptionWrapper}>
                        <p>{post.title.rendered}</p>
                      </div>
                    </a>
                  );
                })} */}
              </div>
            </div>
            <div className={styles.newsletter}>
              <div className={styles.newsletterContainer}>
                <h3>
                  ASSINE NOSSA <strong>NEWSLETTER</strong>
                </h3>
                <Newsletter onSubmitCB={() => {}} />
              </div>
            </div>
          </section>

          <section className={styles.materiais}>
            <div className={styles.materiaisWrapper}>
              <div className={styles.materiaisDiv}>
                <h2>{props.materiais_titulo}</h2>
                <div className={styles.materiaisContainer}>
                  {materiais.map((material) => {
                    const materialLogo = formatStrapiObject(material.logo);
                    return (
                      <div key={material.id} className={styles.material}>
                        <div className={styles.materialDescription}>
                          <div className={styles.materialTitle}>
                            <h3>{material.titulo}</h3>
                            <span></span>
                          </div>
                          <img
                            src={
                              process.env.NEXT_PUBLIC_STRAPI_URL +
                              materialLogo.url
                            }
                          />
                        </div>
                        <div className={styles.materialFooter}>
                          <img
                            src={
                              process.env.NEXT_PUBLIC_STRAPI_URL +
                              futurotecLogo.url
                            }
                          />
                          <p>E-BOOK GRÁTIS</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={styles.materiaisImagem}>
                <img
                  src={process.env.NEXT_PUBLIC_STRAPI_URL + materiaisImage.url}
                />
              </div>
            </div>
            <div className={styles.videosDivider}>
              <span></span>
              <h2>{props.materiais_videos}</h2>
              <span></span>
            </div>
            <div className={styles.videosContainer}>
              <Swiper
                speed={650}
                simulateTouch={false}
                navigation={true}
                loop={false}
                autoplay={{ delay: 4000 }}
              >
                {props.videos.map((video, idx) => {
                  return (
                    <SwiperSlide key={video.id.videoId}>
                      <div className={styles.videoPlayerContainer}>
                        <div
                          className={styles.videoWrapper}
                          onClick={() => videoModal.onShow(video)}
                        >
                          <img src={video.snippet.thumbnails.high.url} />
                        </div>
                        <div className={styles.videoDescricao}>
                          <h3>{video.snippet.title}</h3>
                          <p>{video.snippet.description}</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </section>

          <section className={styles.vantagens}>
            <h2>{props.vantagem_titulo}</h2>
            <div className={styles.vantagensContainer}>
              {props.vantagens.map((vantagem) => {
                const imagem = formatStrapiObject(vantagem.image);
                return (
                  <div key={vantagem.id} className={styles.vantagem}>
                    <div className={styles.vantagemWrapper}>
                      <img
                        src={process.env.NEXT_PUBLIC_STRAPI_URL + imagem.url}
                      />
                      <p>{vantagem.texto}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div onClick={meLigueModal.onShow} className={styles.vantagemCta}>
              {props.vantagem_cta.texto}
            </div>
          </section>
        </main>
        <Footer />

        <Modal
          show={formModal.state}
          onHide={formModal.onHide}
          onEscapeKeyDown={formModal.onHide}
          backdrop="static"
          size="lg"
          scrollable={false}
          className={styles.formModal}
          centered
          keyboard={true}
        >
          <Modal.Header closeButton>Entre em contato</Modal.Header>
          <Modal.Body>
            <Contato
              onSubmitCB={() => {
                formModal.onHide();
              }}
            />
          </Modal.Body>
        </Modal>

        <Modal
          show={Boolean(videoModal.state)}
          onHide={videoModal.onHide}
          onEscapeKeyDown={() => videoModal.onHide(null)}
          fullscreen
          scrollable={false}
          className={styles.videoModal}
          backdrop="static"
          keyboard={true}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            {videoModal.state && (
              <ReactPlayer
                className="react-player"
                controls={true}
                playing={true}
                url={
                  videoModal.state.provider
                    ? (videoModal.state.provider === "local"
                        ? process.env.NEXT_PUBLIC_STRAPI_URL
                        : "") + videoModal.state.url
                    : "www.youtube.com/watch?v=" + videoModal.state.id.videoId
                }
                width="100%"
                height="100%"
              />
            )}
          </Modal.Body>
        </Modal>

        <Modal
          show={meLigueModal.state}
          onHide={meLigueModal.onHide}
          size="lg"
          className={styles.modal}
          onEscapeKeyDown={meLigueModal.onHide}
          backdrop="static"
          keyboard={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>Me ligue</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <iframe
              src="https://www2.futurotec.com.br/meligue"
              title="Me ligue"
              width={"100%"}
              height={"100%"}
            />
          </Modal.Body>
        </Modal>
      </div>
    </AppContext.Provider>
  );
}

export async function getStaticProps() {
  const homepageQuery = qs.stringify(
    {
      populate: [
        "demo_cta",
        "vantagens.image",
        "logo",
        "redes_sociais.icon",
        "escallo_logo_small",
        "escallo_logo",
        "demo_image",
        "vantagem_cta",
        "futurotec_logo",
        "resultados_hero_happy",
        "resultados.icon",
        "resultados_arrow",
        "segmentos_cta",
        "demo_hero_image",
        "youtube_api",
        "materiais_image",
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
  const youtubeApi = homepageData.data.attributes.youtube_api;
  const youtubeResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&maxResults=5&channelId=${youtubeApi.channel_id}&key=${youtubeApi.key}`
  );
  const youtubeVideos = await youtubeResponse.json();
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

  // const postsRes = await fetch(
  //   "https://blog.escallo.com.br/wp-json/wp/v2/posts?_embed&per_page=3"
  // );
  // const posts = await postsRes.json();

  // console.log(posts);
  // post.id
  // post.cover.url
  // post.title
  // post.url

  const materiaisQuery = qs.stringify(
    {
      populate: ["logo", "arquivo", "capa", "preview"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const materiaisRes = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_URL + "/api/materiais?" + materiaisQuery
  );
  const materiais = await materiaisRes.json();

  const menuQuery = qs.stringify(
    {
      populate: ["link"],
      sort: ["order:asc"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const menuRes = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_URL + "/api/menus?" + menuQuery
  );
  const menu = await menuRes.json();

  return {
    props: {
      ...homepageData.data.attributes,
      banners: formatStrapiArray(banners),
      segmentos: formatStrapiArray(segmentos),
      // posts: posts,
      posts: formatStrapiArray(posts),
      materiais: formatStrapiArray(materiais),
      videos: youtubeVideos.items,
      menu: formatStrapiArray(menu),
    },
    revalidate: 10,
  };
}
