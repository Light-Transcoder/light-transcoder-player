import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './style.module.css';
import Home from '../Home';
import PlayerShaka from '../PlayerShaka';
import { autoStart } from '../../api/transcoder';
import PlayerBasic from '../PlayerBasic';

const App = () => {
    const [url, setUrl] = useState(false);
    const [session, setSession] = useState(false);
    
    const onStart = (newUrl) => {
        localStorage.setItem('lastUrl', newUrl);
        setUrl(newUrl);
        autoStart(newUrl, window.bitrateLimit).then((data) => {
            setSession(data.session)
        })
    }
    return <div className={style.home}>
       {!session && <Home onChange={onStart} loading={url !== false} value={localStorage.getItem('lastUrl')} />}
       {session && session.stream && session.stream.type === "DASH" && <PlayerShaka url={session.stream.url} />}
       {session && session.stream && session.stream.type === "DOWNLOAD" && <PlayerBasic url={session.stream.url} />}
    </div>
};

App.propTypes = {
};

export default App;
