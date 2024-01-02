import Card from "react-bootstrap/Card";

export default function ArtistCard(artist) {
  return (
    <Card style={{ width: "15vw" }} className="m-3">
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
