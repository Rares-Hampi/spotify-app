import Card from "react-bootstrap/Card";

export default function TrackCard(album) {
  return (
    <Card style={{ width: "15vw" }} className="m-3">
      <img src={album.album.image.url} />
      <Card.Body>
        <Card.Title>{album.album.song}</Card.Title>
        <Card.Text>{album.album.artist}</Card.Text>
      </Card.Body>
    </Card>
  );
}
