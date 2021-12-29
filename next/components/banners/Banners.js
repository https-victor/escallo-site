import Carousel from "react-bootstrap/Carousel";
import styles from "./banners.module.scss";

const Banners = ({ data }) => {
  console.log(data);
  return (
    <Carousel className={styles.carousel}>
      <Carousel.Item className={styles.carouselItem}>
        <Carousel.Caption>
          <h3>Teste</h3>
          <p>teste2</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className={styles.carouselItem}>
        <Carousel.Caption>
          <h3>Teste</h3>
          <p>teste3</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
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

export default Banners;
