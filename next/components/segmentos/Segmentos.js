import { Swiper, SwiperSlide } from "swiper/react";
import ReactPlayer from "react-player";
import { useState } from "react";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import parseToHtml from "html-react-parser";
import styles from "./segmentos.module.scss";
import classNames from "classnames";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { formatStrapiObject } from "../../functions/formatters";
import SwiperCore, { Autoplay, Navigation } from "swiper";

// install Swiper modules

SwiperCore.use([Autoplay, Navigation]);

const Segmentos = ({ data }) => {
  const { segmentos_titulo, segmentos_cta } = useContext(AppContext);
  const [swiper, setSwiper] = useState(undefined);
  const [activeIndex, setActiveIndex] = useState(0);
  function onSlideChange(newSwiper) {
    setActiveIndex(newSwiper.activeIndex);
  }
  return (
    <section className={styles.segmentos}>
      <h2>{segmentos_titulo}</h2>
      <div className={styles.sliderContainer}>
        <div className={styles.buttons}>
          {data.map((segmento, idx) => {
            const isActive = Boolean(activeIndex === idx);
            const image = formatStrapiObject(segmento.button.image);
            const activeImage = formatStrapiObject(
              segmento.button.image_active
            );

            return (
              <button
                className={isActive ? styles.active : undefined}
                onClick={() => {
                  swiper && swiper.slideTo(idx);
                }}
                key={segmento.id}
              >
                {isActive ? (
                  <img
                    src={process.env.NEXT_PUBLIC_STRAPI_URL + activeImage.url}
                  />
                ) : (
                  <img src={process.env.NEXT_PUBLIC_STRAPI_URL + image.url} />
                )}
                <p
                  className={classNames(
                    styles.text,
                    isActive ? styles.activeText : undefined
                  )}
                >
                  {segmento.button.texto}
                </p>
              </button>
            );
          })}
        </div>
        <Swiper
          speed={650}
          simulateTouch={false}
          onSwiper={setSwiper}
          navigation={true}
          onSlideChange={onSlideChange}
          loop={false}
          style={{ width: "100%" }}
          autoplay={{
            delay: 4000,
          }}
        >
          {data.map((segmento, idx) => {
            const isActive = Boolean(activeIndex === idx);
            const vantagens = parseToHtml(segmento.vantagens);
            const video = formatStrapiObject(segmento.video);
            const logo = formatStrapiObject(segmento.logo);
            return (
              <SwiperSlide key={segmento.id}>
                <div className={styles.description}>{vantagens}</div>
                <div className={styles.videoWrapper}>
                  <ReactPlayer
                    className="react-player"
                    controls={true}
                    url={process.env.NEXT_PUBLIC_STRAPI_URL + video.url}
                    muted={!isActive}
                    width="100%"
                    height="100%"
                  />
                  <div className={styles.tagWrapper}>
                    <div className={styles.tag}>
                      <img
                        src={process.env.NEXT_PUBLIC_STRAPI_URL + logo.url}
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <a href={segmentos_cta.link} target={"_blank"} className={styles.cta}>
          {segmentos_cta.texto}
        </a>
      </div>
    </section>
  );
};

export default Segmentos;
