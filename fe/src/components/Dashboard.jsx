import { useEffect } from "react";
import useAuth from "./UseAuth";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { Container, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

let token;
export default function Dashboard(code) {
  let accesToken = useAuth(code.code);
  useEffect(() => {
    if (!accesToken) {
      return;
    }
    token = accesToken;
  }, [accesToken]);
  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            Menu
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink className="activeClicked">
              <Link to="/user" state={{ token: token }}>
                <CDBSidebarMenuItem icon="user">
                  Find user & get data
                </CDBSidebarMenuItem>
              </Link>
            </NavLink>
            <NavLink className="activeClicked">
              <Link to="/recomandation" state={{ token: token }}>
                <CDBSidebarMenuItem icon="table">
                  Get recomandation
                </CDBSidebarMenuItem>
              </Link>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>

      <Container className="container-fluid d-flex justify-content-center align-items-center">
        <h1>Hi, you successfully logged in!</h1>
      </Container>
    </div>
  );
}
