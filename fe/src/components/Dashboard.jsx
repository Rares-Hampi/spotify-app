import { useEffect, useState } from "react";
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
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "17152b371e7d4284878787a9ea97405c",
});

export default function Dashboard(code) {
  const [token, setToken] = useState();
  const [name, setName] = useState();
  let accesToken = useAuth(code.code);
  useEffect(() => {
    if (!accesToken) {
      return;
    }
    spotifyApi.setAccessToken(accesToken);
    setToken(accesToken);
    spotifyApi.getMe().then(
      (res) => {
        setName(res.body.display_name);
        console.log(name);
        console.log("Some information about this user", res.body);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
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
              <Link to="/user" state={token}>
                <CDBSidebarMenuItem icon="user">
                  Get top tracks and songs
                </CDBSidebarMenuItem>
              </Link>
            </NavLink>
            <NavLink className="activeClicked">
              <Link to="/recomandation" state={token}>
                <CDBSidebarMenuItem icon="table">
                  Get recomandation
                </CDBSidebarMenuItem>
              </Link>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>

      <Container className="container-fluid d-flex justify-content-center align-items-center">
        <h1>Hi {name}, you successfully logged in!</h1>
      </Container>
    </div>
  );
}
