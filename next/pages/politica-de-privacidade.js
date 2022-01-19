import { formatStrapiArray, formatStrapiObject } from "/functions/formatters";
import AppContext from "/context/AppContext";
import qs from "qs";
import Head from "next/head";
import Footer from "/components/footer/Footer";
import Header from "/components/header/Header";
import styles from "/styles/home.module.scss";
import parseToHtml from "html-react-parser";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Contato from "../components/forms/Contato";
import useModal from "../hooks/useModal";

export default function Politica(props) {
  //   menu, escalloLogo, onOpenForm
  // redesSociais, futurotecLogo, escalloLogoSmall, endereco, menu
  const escalloLogo = formatStrapiObject(props.escallo_logo);
  const escalloLogoSmall = formatStrapiObject(props.escallo_logo_small);
  const futurotecLogo = formatStrapiObject(props.futurotec_logo);
  const meLigueModal = useModal();

  const formModal = useModal();
  const conteudo = parseToHtml(props.politica.conteudo);
  return (
    <AppContext.Provider
      value={{
        meLigueModal,
        formModal,
        escalloLogo,
        menu: props.menu,
        escalloLogoSmall,
        redesSociais: props.redes_sociais,
        futurotecLogo,
        endereco: props.endereco,
      }}
    >
      <div className={styles.page}>
        <Head>
          <title>{props.politica.titulo}</title>
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

        <main className={styles.main}>{conteudo}</main>
        <Footer />

        <Modal
          show={formModal.state}
          onHide={formModal.onHide}
          onEscapeKeyDown={formModal.onHide}
          size="lg"
          scrollable={false}
          className={styles.formModal}
          backdrop="static"
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
          show={meLigueModal.state}
          onHide={meLigueModal.onHide}
          size="lg"
          className={styles.modal}
          centered
          keyboard={false}
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
  const politicaRes = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_URL + "/api/politica-de-privacidade"
  );
  const politicaData = await politicaRes.json();

  const homepageQuery = qs.stringify(
    {
      populate: [
        "redes_sociais.icon",
        "escallo_logo_small",
        "escallo_logo",
        "futurotec_logo",
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
  console.log(homepageData);

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
      politica: politicaData.data.attributes,
      menu: formatStrapiArray(menu),
    },
    revalidate: 1,
  };
}
