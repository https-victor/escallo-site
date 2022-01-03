import { Swiper, SwiperSlide } from "swiper/react";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import parseToHtml from "html-react-parser";
import styles from "./banners.module.scss";
import classNames from "classnames";
import "swiper/css";
import "swiper/css/autoplay";
import { formatStrapiObject } from "../../functions/formatters";
import SwiperCore, { Autoplay } from "swiper";

// install Swiper modules
SwiperCore.use([Autoplay]);
const Banner = ({
  layout_type,
  social_media,
  id,
  hero_image,
  description,
  cta,
  background,
}) => {
  const { logoImage, subtitulo_logo } = useContext(AppContext);
  const backgroundImage = background.background_image
    ? formatStrapiObject(background.background_image)
    : background.background_image;
  const heroImage = hero_image ? formatStrapiObject(hero_image) : hero_image;
  switch (layout_type) {
    case "layout_1":
      return (
        <div
          className={classNames(styles.layout_1, styles.bannerWrapper)}
          style={{
            backgroundColor: background.color ? background.color : "initial",
          }}
        >
          {backgroundImage && (
            <img
              className={styles.background}
              alt={backgroundImage.caption}
              src={process.env.NEXT_PUBLIC_STRAPI_URL + backgroundImage.url}
            />
          )}
          <div className={styles.topSection}>
            <div className={styles.leftSection}>
              <img
                className={styles.logo}
                alt={logoImage.caption}
                src={process.env.NEXT_PUBLIC_STRAPI_URL + logoImage.url}
              />
              <p className={styles.subtitulo}>{parseToHtml(subtitulo_logo)}</p>
              <div className={styles.socialMedia}>
                {social_media.map((item) => {
                  const image = formatStrapiObject(item.icon);
                  return (
                    <img
                      src={process.env.NEXT_PUBLIC_STRAPI_URL + image.url}
                      key={item.id}
                    />
                  );
                })}
              </div>
            </div>
            <div className={styles.rightSection}>
              <img
                className={styles.heroImage}
                alt={heroImage.caption}
                src={process.env.NEXT_PUBLIC_STRAPI_URL + heroImage.url}
              />
            </div>
          </div>
          <div className={styles.divider}>
            <div className={styles.wrapper}>
              <div className={styles.line}></div>
              {cta.map((cta) => (
                <a
                  href={cta.link}
                  key={cta.id}
                  target="_blank"
                  className={styles.cta}
                >
                  {cta.texto}
                </a>
              ))}
              <div className={styles.line}></div>
            </div>
          </div>
          <div className={styles.bottomSection}>{description}</div>
        </div>
      );
    case "layout_2":
      return (
        <div className={classNames(styles.layout_2, styles.bannerWrapper)}>
          Slide 1
        </div>
      );
    default:
      return undefined;
  }
};

const Banners = ({ data }) => {
  return (
    <section className={styles.carousel}>
      <Swiper
        loop={data.length > 1}
        speed={650}
        simulateTouch={false}
        autoplay={
          data.length > 1
            ? {
                delay: 1500,
                disableOnInteraction: true,
              }
            : undefined
        }
      >
        {data.map(({ id, ...banner }) => (
          <SwiperSlide key={id} className={styles.slide}>
            <Banner {...banner} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banners;
