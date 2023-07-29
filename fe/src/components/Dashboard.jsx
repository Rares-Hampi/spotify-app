import { useEffect } from "react";
import useAuth from "./UseAuth";
import SpotifyWebApi from "spotify-web-api-node";
import env from "dotenv";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { Container, NavLink } from "react-bootstrap";

const spotifyApi = new SpotifyWebApi({
  clientId: env.CLIENT_ID,
});

export default function Dashboard(code) {
  let accesToken = useAuth(code.code);
  useEffect(() => {
    if (!accesToken) {
      return;
    }
    spotifyApi.setAccessToken(accesToken);
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
            <NavLink activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">
                Find user & get data
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">
                Get recomandation
              </CDBSidebarMenuItem>
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
