import React, { useState } from 'react';
import style from './style.module.css';
import Home from '../Home';
import { autoStart } from '../../api/transcoder';
import PlayerBasic from '../PlayerBasic';
import PlayerDash from '../PlayerDash';
import PlayerHLS from '../PlayerHLS';

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
       {session && session.stream && (session.stream.type === "DASH") && <PlayerDash url={session.stream.url} />}
       {session && session.stream && (session.stream.type === "HLS") && <PlayerHLS url={session.stream.url} />}
       {session && session.stream && session.stream.type === "DOWNLOAD" && <PlayerBasic url={session.stream.url} />}
    </div>
};

App.propTypes = {
};

export default App;
