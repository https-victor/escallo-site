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
  console.log(cta);
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
              src={"http://localhost:1337" + backgroundImage.url}
            />
          )}
          <div className={styles.topSection}>
            <div className={styles.leftSection}>
              <img
                className={styles.logo}
                alt={logoImage.caption}
                src={"http://localhost:1337" + logoImage.url}
              />
              <p className={styles.subtitulo}>{parseToHtml(subtitulo_logo)}</p>
            </div>
            <div className={styles.rightSection}>
              <img
                className={styles.heroImage}
                alt={heroImage.caption}
                src={"http://localhost:1337" + heroImage.url}
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
  // return <div className={styles.bannersContainer}>
  //   <div id="esc-hero-slider-1" style="background-image:url(<?php echo $background; ?>)">

  // 	<div id="esc-hero-slider-1-top">
  // 		<div id="esc-hero-slider-1-top-left">
  // 			<img src="<?php echo $escalloLogo ?>" alt="Logo do Escallo"/>
  // 			<?php echo $logoTexto; ?>
  // 			<div id="esc-hero-slider-1-links-uteis">
  // 				<a href="<?php echo $whatsappLink ?>" target="_blank" id="esc-whastapp-link-util">
  // 					<img src="<?php echo $whatsappImage ?>" alt="Logo do WhatsApp"/>
  // 				</a>
  // 				<a href="<?php echo $instagramLink ?>" target="_blank" id="esc-instagram-link-util">
  // 					<img src="<?php echo $instagramImage ?>" alt="Logo do Instagram"/>
  // 				</a>
  // 				<a href="<?php echo $chatLink ?>" target="_blank" id="esc-chat-link-util">
  // 					<img src="<?php echo $chatImage ?>" alt="Logo do chat"/>
  // 				</a>
  // 				<a href="<?php echo $phoneLink ?>" target="_blank" id="esc-phone-link-util">
  // 					<img src="<?php echo $phoneImage ?>" alt="Logo do telefone"/>
  // 				</a>
  // 				<a href="<?php echo $facebookLink ?>" target="_blank" id="esc-facebook-link-util">
  // 					<img src="<?php echo $facebookImage ?>" alt="Logo do Facebook"/>
  // 				</a>
  // 				<a href="<?php echo $messengerLink ?>" target="_blank" id="esc-messenger-link-util">
  // 					<img src="<?php echo $messengerImage ?>" alt="Logo do Messenger"/>
  // 				</a>
  // 			</div>
  // 		</div>

  // 		<img src="<?php echo $heroImage; ?>" id="esc-hero-slider-1-top-right" />
  // 	</div>

  // 	<div id="esc-hero-slider-1-divider">
  // 		<div id="esc-hero-slider-1-divider-left" class="esc-hero-slider-1-divider-line"></div>
  // 		<a href="<?php echo $ctaLink ?>" target="_blank" class="esc-cta" id="esc-hero-slider-1-cta">
  // 			<?php echo $ctaTexto ?>
  // 		</a>
  // 		<div id="esc-hero-slider-1-divider-right" class="esc-hero-slider-1-divider-line"></div>
  // 	</div>
  // 	<h3 id="esc-hero-slider-1-subtitle">
  // 		<?php echo $subtitle; ?>
  // 	</h3>
  // </div>
  // </div>;
};

const Banners = ({ data }) => {
  console.log(data);
  return (
    <div className={styles.carousel}>
      <Swiper
        loop={data.length > 1}
        speed={650}
        autoplay={{
          delay: 1500,
          disableOnInteraction: true,
        }}
        className="mySwiper"
      >
        {data.map(({ id, ...banner }) => (
          <SwiperSlide key={id} className={styles.slide}>
            <Banner {...banner} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banners;
