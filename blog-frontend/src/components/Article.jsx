import PropTypes from "prop-types";
import Card from 'react-bootstrap/Card';

const Article = ({ numberId, title, brief, content, image, username, createdAt }) => {
  const formatDate = (dateString) => {
    const options = {year: 'numeric', month: 'numeric', day: 'numeric' };
    const formatedDate = new Date(dateString).toLocaleDateString(undefined, options);

    return formatedDate;
  }
  return (
    <Card className="bg-secondary bg-gradient" border="info" style={{ width: '25rem' }}>
        <Card.Header>Artículo {numberId}</Card.Header>
        {image && <Card.Img variant="top" src={image} />}
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          {brief && <Card.Text style={{opacity: 0.7}}>{brief}</Card.Text>}
          <Card.Text>{content}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">created by: {username}</small>
          <br />
          <small className="text-muted">date: {formatDate(createdAt)}</small>

        </Card.Footer>
    </Card>
  );
};

Article.propTypes = {
    numberId: PropTypes.number.isRequired,
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