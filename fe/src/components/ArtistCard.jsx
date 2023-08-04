import Card from "react-bootstrap/Card";

export default function ArtistCard(artist) {
  console.log(artist.artist.gender);
  return (
    <Card style={{ width: "18rem" }}>
      <img src={artist.artist.image.url} />
      <Card.Body>
        <Card.Title>{artist.artist.name}</Card.Title>
        <Card.Text>
          {artist.artist.genres.map((desc, i) => (
            <span key={i}>{desc}</span>
          ))}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
