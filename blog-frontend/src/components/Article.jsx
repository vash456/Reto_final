import PropTypes from "prop-types";
import Card from 'react-bootstrap/Card';

const Article = ({ title, brief, content, image, username, createdAt }) => {
  return (
    <Card border="info" style={{ width: '18rem' }}>
        <Card.Header>Artículo</Card.Header>
        {image && <Card.Img variant="top" src={image} />}
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text style={{opacity: 0.7}}>{brief}</Card.Text>
          <Card.Text>{content}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">created by: {username}</small>
          <br />
          <small className="text-muted">date: {createdAt}</small>

        </Card.Footer>
    </Card>
  );
};

Article.propTypes = {
    title: PropTypes.string.isRequired,
    brief: PropTypes.string,
    content: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
    image: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOf([null]),
    ]),

};

export default Article;