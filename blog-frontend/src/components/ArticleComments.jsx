import PropTypes from 'prop-types';

const ArticleComments = ({ comments }) => {

    const formatDate = (dateString) => {
        const formatedDate = new Date(dateString).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
        return formatedDate;
      }
    return (
        <div>
            {comments.length > 0 ? (
                comments.map((comment, index) => (
                    <div className="mx-auto" style={{
                        borderColor: 'info',
                        borderStyle: 'solid',
                        borderWidth: '1px',
                        padding: '10px',
                        width: '40%',
                        marginBottom: '10px',
                        }}
                        key={`${comment.id}${index}`}
                    >
                        <p>Usuario: {comment.name}</p>
                        <p>Comentario: {comment.comment}</p>
                        <p>Email: {comment.email}</p>
                        <p>fecha: {formatDate(comment.created_at)}</p>
                        <br />
                    </div>
                ))
            ):(
                <p>No hay comentarios</p>
            )}
        </div>
    );
}

ArticleComments.propTypes = {
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        comment: PropTypes.string.isRequired,
        email: PropTypes.string,
        created_at: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

export default ArticleComments;
