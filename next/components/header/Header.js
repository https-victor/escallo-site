import styles from "./header.module.scss";
import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { getFunctions } from "../../functions/utils";
import useMenuFunctions from "../../hooks/useMenuFunctions";

const Header = () => {
  const { menu, escalloLogo, formModal } = useContext(AppContext);
  const getFunctions = useMenuFunctions();
  const NavItem = ({ item }) => {
    const isAction = Boolean(item.action !== "nenhum");
    if (item.link && item.link.length > 0) {
      return (
        <NavDropdown title={item.titulo} id="nav-dropdown" active={false}>
          {item.link.map((subitem, idx) => {
            const isSubitemAction = Boolean(subitem.action !== "nenhum");
            if (isSubitemAction) {
              return (
                <NavDropdown.Item
                  key={item.id + idx}
                  as={Nav.Item}
                  onClick={getFunctions(subitem.action)}
                >
                  {subitem.titulo}
                </NavDropdown.Item>
              );
            } else if (subitem.externo) {
              return (
                <NavDropdown.Item
                  key={item.id + idx}
                  active={false}
                  as={Nav.Link}
                  href={subitem.url}
                  target="_blank"
                >
                  {subitem.titulo}
                </NavDropdown.Item>
              );
            }
            return (
              <NavDropdown.Item
                key={item.id + idx}
                active={false}
                as={Link}
                href={subitem.url}
                target="_blank"
              >
                <a className="nav-link dropdown-item">{subitem.titulo}</a>
              </NavDropdown.Item>
            );
          })}
        </NavDropdown>
      );
    } else if (isAction) {
      return (
        <Nav.Item onClick={getFunctions(item.action)}>
          <Nav.Link>{item.titulo}</Nav.Link>
        </Nav.Item>
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
      <Link href="/">
        <a className={styles.logo}>
          <img src={process.env.NEXT_PUBLIC_STRAPI_URL + escalloLogo.url} />
        </a>
      </Link>
      <Nav onSelect={() => {}} activeKey={undefined}>
        {menu.map((item) => (
          <NavItem key={item.id} item={item} />
        ))}
      </Nav>
    </header>
  );
};

export default Header;
