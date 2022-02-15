import PropTypes from 'prop-types';

function Tooltip(props) {
  return (
    <div className={"tooltip"}>
      <p className={"paragraph-error"}>
        {props.errorMessage}
      </p>
    </div>
  );
}

Tooltip.propTypes = {
  errorMessage: PropTypes.string,
}

Tooltip.defaultProps = {
  errorMessage: 'Ошибка ввода'
}

export default Tooltip;
