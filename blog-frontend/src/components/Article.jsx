import PropTypes from "prop-types";
import Card from 'react-bootstrap/Card';

const Article = ({ title, brief, content, image, username }) => {
  return (
    <Card border="info" style={{ width: '18rem' }}>
        <Card.Header>Artículo</Card.Header>
        {image && <Card.Img variant="top" src={image} />}
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {content}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">created by: {username}</small>
        </Card.Footer>
    </Card>
  );
};

Article.propTypes = {
    title: PropTypes.string.isRequired,
    brief: PropTypes.string,
    content: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOf([null]),
    ]),

};

export default Article;