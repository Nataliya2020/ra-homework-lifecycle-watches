import Watches from './Watches'
import PropTypes from 'prop-types';

function ShowWatches(props) {
  return (
    <>
      {props.watches.map(elem => {
        return <Watches item={elem} key={elem.id} handleRemove={props.del}/>
      })}
    </>
  )
}

ShowWatches.propTypes = {
  watches: PropTypes.array,
  del: PropTypes.func
}

ShowWatches.defaultProps = {
  watches: [],
  del: () => {
  }
}
export default ShowWatches;
