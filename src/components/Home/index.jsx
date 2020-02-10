import React from 'react';
import style from './style.module.css';
import Spinner from '../Spinner';

const Home = ({ onChange = () => { }, loading = false, value = '' }) => <div className={style.home}>
    <input className={style.field} defaultValue={value} readOnly={loading} placeholder="https://mywebsite.com/myfile.mkv" onKeyDown={(e) => { if (e.keyCode === 13) { onChange(e.target.value); } }} />
    <div className={style.message}>
        Bitrate:
     <select className={style.select} id="bitrate" defaultValue={window.bitrateLimit} onChange={(e) => (window.bitrateLimit = parseInt(e.target.value, 10))}>
            <option value="-1">Maximum</option>
            <option value="140000">140Mbit/s (8k)</option>
            <option value="80000">80Mbit/s (4k)</option>
            <option value="70000">70Mbit/s (4k)</option>
            <option value="60000">60Mbit/s (4k)</option>
            <option value="50000">50Mbit/s (4k)</option>
            <option value="30000">30Mbit/s (1440p)</option>
            <option value="22000">22Mbit/s (1440p)</option>
            <option value="20000">20Mbit/s (1080p)</option>
            <option value="12000">12Mbit/s (1080p)</option>
            <option value="10000">10Mbit/s (1080p)</option>
            <option value="8000">8Mbit/s (1080p)</option>
            <option value="4000">4Mbit/s (720p)</option>
            <option value="3000">3Mbit/s (720p)</option>
            <option value="2000">2Mbit/s (720p)</option>
            <option value="1750">1.75Mbit/s (576p)</option>
            <option value="1250">1.25Mbit/s (480p)</option>
            <option value="750">0.75Mbit/s (350p)</option>
            <option value="500">0.5Mbit/s (240p)</option>
            <option value="250">0.25Mbit/s (160p)</option>
        </select>
    </div>
    <div className={style.message}>❤ It's easy! Choose your quality, paste a media file link and press enter ❤</div>
    {loading && <Spinner />}
</div>;

Home.propTypes = {
};

export default Home;
