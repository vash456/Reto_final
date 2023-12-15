import PropTypes from 'prop-types'
import { Pagination } from 'react-bootstrap';

const HomePagination = ({paginate, totalArticles, articlesPerPage}) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
     pageNumbers.push(i);
    }

    const handlePageClick = (number) => {
        paginate(number);
        // Desplazar hacia arriba al cambiar de página
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Pagination className='justify-content-center bg-dark'>
            {pageNumbers.map((number) => (
                <Pagination.Item key={number} onClick={()=>handlePageClick(number)}>
                    {number}
                </Pagination.Item>
            ))}
        </Pagination>
    )
}

HomePagination.propTypes = {
    paginate: PropTypes.func,
    totalArticles: PropTypes.number,
    articlesPerPage: PropTypes.number,


}

export default HomePagination;
