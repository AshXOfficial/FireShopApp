import UniqueId from "../helpers/UniqueId";
import propTypes from "prop-types";

const Rating = ({ value, text, color }) => {

    const stars = [];

    for (let i = 1; i <= 5; i++) {
        stars.push(<i key={`"${UniqueId(11)}"`}
            className={ `${value >= i ? 'fas fa-star'
                : value === i - 0.5 ? 'fas fa-star-half-alt'
                : 'far fa-star'} ` + color}></i>);
    }
	return (
		<div className="Rating">
            <small className="mr-3"> {stars} </small>
            <small>{ text && text }</small>
		</div>
	);
};

Rating.defaultProps = {
    color: '#f8e825',
}

Rating.propTypes = {
    value: propTypes.number,
    text: propTypes.string.isRequired,
    color: propTypes.string.isRequired,
}

export default Rating;
