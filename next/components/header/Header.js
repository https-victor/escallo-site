import styles from "./header.module.css";
import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = ({ escalloLogo, menu }) => {
  // function renderItem(item) {
  //   const Wrapper = (props) => {
  //     if (item.url) {
  //       if (item.externo) {
  //         return <a href={item.url} target="_blank" {...props}></a>;
  //       } else {
  //         return (
  //           <Link href={item.url}>
  //             <a {...props}></a>
  //           </Link>
  //         );
  //       }
  //     }
  //     return <div {...props}></div>;
  //   };
  //   return <Wrapper>{item.link.map(renderItem)}</Wrapper>;
  // }
  return (
    <header className={styles.header}>
      <img src={process.env.NEXT_PUBLIC_STRAPI_URL + escalloLogo.url} />
      {/* <nav>{menu.map(renderItem)}</nav> */}
    </header>
  );
};

export default Header;
