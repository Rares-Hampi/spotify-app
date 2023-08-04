import { useEffect, useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { Link } from "react-router-dom";
import { Container, NavLink } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import SpotifyWebApi from "spotify-web-api-node";
import ArtistCard from "./ArtistCard";

const spotifyApi = new SpotifyWebApi({
  clientId: "17152b371e7d4284878787a9ea97405c",
});

export default function User() {
  let token = useLocation();
  const [topArtists, setTopArtists] = useState([]);
  console.log(topArtists);
  useEffect(() => {
    if (!token.state) {
      return;
    }
    spotifyApi.setAccessToken(token.state);
  }, [token.state]);

  function getData() {
    spotifyApi.getMyTopArtists().then(
      (res) => {
        setTopArtists(
          res.body.items.map((artist) => {
            return {
              name: artist.name,
              image: artist.images[0],
              id: artist.id,
              genres: artist.genres,
            };
          })
        );
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
    spotifyApi.getMyTopTracks().then(
      (res) => {
        let topTrack = res.body.items;
        console.log(topTrack);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }

  useEffect(() => {
    if (!token.state) {
      return;
    }
    getData();
  }, [token.state]);
  console.log(`( ${topArtists} )`);
  return (
    <div>
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
      </div>
      {topArtists.map((artist) => (
        <ArtistCard artist={artist} key={artist.id} />
      ))}
    </div>
  );
}
