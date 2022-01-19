import Link from "next/link";
import Script from "next/script";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { formatStrapiObject } from "../../functions/formatters";
import { getFunctions } from "../../functions/utils";
import useMenuFunctions from "../../hooks/useMenuFunctions";
import styles from "./footer.module.scss";

const Footer = () => {
  const {
    redesSociais,
    futurotecLogo,
    escalloLogoSmall,
    endereco,
    formModal,
    menu,
  } = useContext(AppContext);

  const getFunctions = useMenuFunctions();

  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <img src={process.env.NEXT_PUBLIC_STRAPI_URL + escalloLogoSmall.url} />
        <div className={styles.menu}>
          {menu.map((item) => {
            if (item.link.length > 0) {
              return (
                <div key={item.id}>
                  <h3>{item.titulo}</h3>
                  {item.link.map((subitem, idx) => {
                    const isSubitemAction = Boolean(
                      subitem.action !== "nenhum"
                    );
                    if (isSubitemAction) {
                      return (
                        <a onClick={getFunctions(subitem.action)}>
                          {subitem.titulo}
                        </a>
                      );
                    }
                    return (
                      <Link
                        target="_blank"
                        href={subitem.url}
                        key={item.id + idx}
                      >
                        <a>{subitem.titulo}</a>
                      </Link>
                    );
                  })}
                </div>
              );
            }
          })}
        </div>
        <div className={styles.redesSociais}>
          <h3>Redes Sociais</h3>
          <div className={styles.container}>
            {redesSociais.map((item) => {
              const icon = formatStrapiObject(item.icon);
              return (
                <a key={item.id} href={item.url} target="_blank">
                  <img src={process.env.NEXT_PUBLIC_STRAPI_URL + icon.url} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.bottom}>
        <img src={process.env.NEXT_PUBLIC_STRAPI_URL + futurotecLogo.url} />
        <p>{endereco}</p>
      </div>
      <Script
        src="https://cdn.escallo.com.br/widget/www/js/chat.js"
        strategy="beforeInteractive"
      />
      <Script
        id="escallo-show-widget"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
      var escalloWidget = new WidgetEscallo();
      escalloWidget.init({
        auto_inicio: 1,
        newLayout: 1,
        host: "https://webchat.escallo.com.br/3c1ab231/",
        autocomplete: 1,
        convencionalConfig: 1,
        color: "47c1f1",
        chat: {
            empresa: "Escallo",
        },
        email: {
            url: "contato@futurotec.com.br",
        },
        wpp: {
            url: "https://wa.me/553138016805",
        },
        messenger: {
            url: "https://www.messenger.com/t/futurotec.escallo"
        },
        widgets: [
            {
                tooltip: "Instagram",
                img: "https://i1.wp.com/zephyrstudiosla.com/wp-content/uploads/2018/01/best-solutions-of-instagram-png-transparent-png-images-unique-white-instagram-logo-outline-of-white-instagram-logo-outline-copy.png?fit=1200%2C1200&ssl=1&w=640",
                url: "https://www.instagram.com/futuro.tec",
                background: "#cc2366  ",
                color: "#fff",
            }
        ]
    });
      `,
        }}
      />
    </footer>
  );
};

export default Footer;
