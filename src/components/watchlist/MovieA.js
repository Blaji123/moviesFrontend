import { useEffect } from "react";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MovieCard from "./MovieCard";
import MoviePaginator from "./MoviePaginator";
import api from "../../api/axiosConfig";

const MovieA = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviePerPage] = useState(12);

  const getMovies = async () => {
    try {
      const email = localStorage.getItem("userId");
      const response = await api.get(`watchlist/${email}/getByUserEmail`);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const response = await getMovies();
      setData(response);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(data.length / moviePerPage);

  const renderMovies = () => {
    const startIndex = (currentPage - 1) * moviePerPage;
    const endIndex = startIndex + moviePerPage;
    return data
      .slice(startIndex, endIndex)
      .map((data) => <MovieCard key={data.movie.imdbId} movie={data.movie} />);
  };

  return (
    <Container>
      {isLoading && <div>Loading movies...</div>}
      {error && <div className="text text-danger">Error : {error.message}</div>}
      <Row>
        <Col md={6} className="d-flex align-items-center justify-content-end">
          <MoviePaginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>
      <Row>{renderMovies()}</Row>
      <Row>
        <Col md={6} className="d-flex align-items-center justify-content-end">
          <MoviePaginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>
    </Container>
  );
};
export default MovieA;
