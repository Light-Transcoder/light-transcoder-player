import muxjs from "mux.js";
import PropTypes from 'prop-types';
import PlayerDash from '../PlayerDash';

class PlayerHLS extends PlayerDash {
    componentDidMount() {
        window.muxjs = muxjs;
        super.componentDidMount();
    }
}

PlayerHLS.propTypes = {
    url: PropTypes.string
};

export default PlayerHLS;
