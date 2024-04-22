import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  function reviews(movieId) {
    navigate(`/Reviews/${movieId}`);
  }
  return (
    <Col key={movie.imdbId} className="mb-4" xs={12}>
      <Card>
        <Card.Body className="d-flex flex-wrap align-items-center">
          <div className="flex-shrink-0 mr-3 mb-3 mb-md-0">
            <Card.Img
              variant="top"
              src={movie.poster}
              alt="movie photo"
              style={{ width: "100%", maxWidth: "200px", height: "auto" }}
            />
          </div>
          <div className="flex-grow-1 ml-3 px-5">
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.releaseDate}</Card.Text>
          </div>
          <div className="movie-review-button-container">
            <Button variant="info" onClick={() => reviews(movie.imdbId)}>
              Reviews
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
export default MovieCard;
