import React from "react";
import { Container } from "react-bootstrap";

export default function Login() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <a
        className="btn  btn-success btn-lg"
        href="https://accounts.spotify.com:443/authorize?client_id=17152b371e7d4284878787a9ea97405c&response_type=code&redirect_uri=http://localhost:5173/&scope=user-read-private%20user-read-email%20user-library-modify%20user-top-read%20playlist-modify-public&state=some-state-of-my-choice"
      >
        Login
      </a>
    </Container>
  );
}
