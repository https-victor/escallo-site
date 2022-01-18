import Link from "next/link";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { formatStrapiObject } from "../../functions/formatters";
import styles from "./footer.module.scss";

const Footer = () => {
  const { redesSociais, futurotecLogo, escalloLogoSmall, endereco, menu } =
    useContext(AppContext);

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
                  {item.link.map((subItem, idx) => {
                    return (
                      <Link
                        target="_blank"
                        href={subItem.url}
                        key={item.id + idx}
                      >
                        <a>{subItem.titulo}</a>
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
    </footer>
  );
};

export default Footer;
