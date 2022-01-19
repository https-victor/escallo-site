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
import Image from "../image/Image";
import NextImage from "next/image";
import useMenuFunctions from "../../hooks/useMenuFunctions";
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
  const { logoImage, subtitulo_logo, onClickLigueMe } = useContext(AppContext);
  const getFunctions = useMenuFunctions();
  const isAction = Boolean(cta.action !== "nenhum");
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
            <div className={styles.background}>
              <Image
                priority="true"
                layout={"fill"}
                unsized="true"
                objectFit="cover"
                width="100%"
                height="100%"
                objectPosition="bottom"
                alt={backgroundImage.caption}
                src={process.env.NEXT_PUBLIC_STRAPI_URL + backgroundImage.url}
              />
            </div>
          )}
          <div className={styles.topSection}>
            <div className={styles.leftSection}>
              <Image
                priority="true"
                layout={"fill"}
                unsized="true"
                position="relative"
                maxHeight="80%"
                maxWidth="70%"
                width="100%"
                minWidth="250px"
                wrapperClassName={styles.logo}
                alt={logoImage.caption}
                src={process.env.NEXT_PUBLIC_STRAPI_URL + logoImage.url}
              />
              <p className={styles.subtitulo}>{parseToHtml(subtitulo_logo)}</p>
              <div className={styles.socialMedia}>
                {social_media.map((item) => {
                  const image = formatStrapiObject(item.icon);
                  return (
                    <Image
                      priority="true"
                      className={styles.socialMediaImg}
                      layout={"fill"}
                      width={30}
                      height={30}
                      src={process.env.NEXT_PUBLIC_STRAPI_URL + image.url}
                      key={item.id}
                    />
                  );
                })}
              </div>
            </div>
            <div className={styles.rightSection}>
              {/* <img */}
              <Image
                priority="true"
                layout={"fill"}
                unsized="true"
                position="relative"
                maxHeight="80%"
                minHeight="350px"
                height="100%"
                objectPosition="bottom right"
                className={styles.heroImage}
                alt={heroImage.caption}
                src={process.env.NEXT_PUBLIC_STRAPI_URL + heroImage.url}
              />
            </div>
          </div>
          <div className={styles.divider}>
            <div className={styles.wrapper}>
              <div className={styles.line}></div>
              {cta.map((cta) => {
                if (isAction) {
                  return (
                    <div
                      onClick={getFunctions(cta.action)}
                      key={cta.id}
                      className={styles.cta}
                    >
                      {cta.texto}
                    </div>
                  );
                }
                return (
                  <a href={cta.link} target="_blank" className={styles.cta}>
                    {cta.texto}
                  </a>
                );
              })}
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
