import React from 'react';
import Shaka from 'shaka-player';
import PropTypes from 'prop-types';
import style from './style.module.css';
import Spinner from '../Spinner';

class PlayerShaka extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    render() {
        return (
            <video ref={this.ref} className={style.player} autoPlay width="1920" height="1080" controls/>
        );
    }

    componentDidMount() {
        // Install polyfills
        Shaka.polyfill.installAll();

        // Test compatibility
        if (!Shaka.Player.isBrowserSupported()) {
            console.error('Browser not supported!');
            return;
        }

        // Init Shaka Player
        const player = new Shaka.Player(this.ref.current);
        player.configure({
            streaming: {
                retryParameters: {
                    timeout: 10000,
                    maxAttempts: 50,
                    baseDelay: 0,
                    backoffFactor: 0,
                    fuzzFactor: 0,
                }
            }
        });

        // Error handling
        player.addEventListener('error', (event) => {
            console.error('Error code', event.detail.code, 'object', event.detail);
        });
        player.load(this.props.url).then(() => {
            console.log('The video has now been loaded!');
        }).catch((error) => {
            console.error('Error code', error.code, 'object', error);
        });

        // Assign to window to enable debug 
        window._player = player;
    }
}

PlayerShaka.propTypes = {
    url: PropTypes.string
};

export default PlayerShaka;
