import styles from "./header.module.scss";
import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useContext } from "react";
import AppContext from "../../context/AppContext";

const Header = () => {
  const { menu, escalloLogo } = useContext(AppContext);
  const NavItem = ({ item }) => {
    if (item.link && item.link.length > 0) {
      return (
        <NavDropdown title={item.titulo} id="nav-dropdown" active={false}>
          {item.link.map((subItem, idx) => {
            if (subItem.externo) {
              return (
                <NavDropdown.Item
                  key={item.id + idx}
                  active={false}
                  as={Nav.Link}
                  href={subItem.url}
                  target="_blank"
                >
                  {subItem.titulo}
                </NavDropdown.Item>
              );
            }
            return (
              <NavDropdown.Item
                key={item.id + idx}
                active={false}
                as={Link}
                href={subItem.url}
                target="_blank"
              >
                <a className="nav-link dropdown-item">{subItem.titulo}</a>
              </NavDropdown.Item>
            );
          })}
        </NavDropdown>
      );
    } else if (item.url) {
      if (item.externo) {
        return (
          <Nav.Item>
            <Nav.Link href={item.url} target="_blank">
              {item.titulo}
            </Nav.Link>
          </Nav.Item>
        );
      } else {
        return (
          <Nav.Item>
            <Nav.Link>
              <Link href={item.url} target="_blank">
                {item.titulo}
              </Link>
            </Nav.Link>
          </Nav.Item>
        );
      }
    }
    return <></>;
  };
  return (
    <header className={styles.header}>
      <a href="./">
        <img src={process.env.NEXT_PUBLIC_STRAPI_URL + escalloLogo.url} />
      </a>
      <Nav onSelect={() => {}} activeKey={undefined}>
        {menu.map((item) => (
          <NavItem key={item.id} item={item} />
        ))}
      </Nav>
    </header>
  );
};

export default Header;
