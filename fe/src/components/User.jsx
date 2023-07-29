import { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "17152b371e7d4284878787a9ea97405c",
});
export default function User() {
  let token = useLocation();
  const [topArtists, setTopArtists] = useState();
  const [topTracks, setTopTracks] = useState();
  useEffect(() => {
    if (!token.state) {
      return;
    }
    spotifyApi.setAccessToken(token.state);
  }, [token.state]);

  useEffect(() => {
    if (!token.state) {
      return;
    }

    spotifyApi.getMyTopArtists().then(
      (res) => {
        let topArtist = res.body.items;
        setTopArtists(...topArtist);
        console.log(topArtists);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
    spotifyApi.getMyTopTracks().then(
      (res) => {
        let topTrack = res.body.items;
        setTopTracks(...topTrack);
        console.log(topTracks);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }, [token]);

  return (
    <Row xs={1} md={2} className="g-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
