import { useEffect, useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { Link } from "react-router-dom";
import { Col, NavLink, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import SpotifyWebApi from "spotify-web-api-node";
import ArtistCard from "./ArtistCard";
import TrackCard from "./TrackCard";

const spotifyApi = new SpotifyWebApi({
  clientId: "17152b371e7d4284878787a9ea97405c",
});

export default function User() {
  let token = useLocation();
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [getRecom, setRecom] = useState([]);

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
        setTopTracks(
          res.body.items.map((album) => {
            return {
              song: album.name,
              image: album.album.images[0],
              id: album.id,
              artist: album.artists[0].name,
            };
          })
        );
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }
  function makeRecom() {
    spotifyApi
      .getRecommendations({
        min_energy: 0.4,
        seed_artists: topArtists.slice(1, 6).map((artist) => {
          return artist.id;
        }),
        min_popularity: 50,
      })
      .then(
        (res) => {
          setRecom(
            res.body.tracks.map((track) => {
              return {
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
              };
            })
          );
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
    makeRecom();
  }, [token.state]);

  return (
    <div className="d-flex ">
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
                <Link to="/recomandation" state={getRecom}>
                  <CDBSidebarMenuItem icon="table">
                    Get recomandation
                  </CDBSidebarMenuItem>
                </Link>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>
      </div>
      <Col>
        <h1>The most listened artists by you</h1>
        <Row>
          {topArtists.slice(0, 5).map((artist) => (
            <ArtistCard artist={artist} key={artist.id} />
          ))}
        </Row>
        <h1>The most listened songs by you</h1>
        <Row>
          {topTracks.slice(0, 5).map((album) => (
            <TrackCard album={album} key={album.id} />
          ))}
        </Row>
      </Col>
    </div>
  );
}
