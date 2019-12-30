import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.css';
import Spinner from '../Spinner';

const Home = ({ onChange = () => { }, loading = false, value = '' }) => <div className={style.home}>
    <input className={style.field} defaultValue={value} readOnly={loading} placeholder="https://mywebsite.com/myfile.mkv" onKeyDown={(e) => { if (e.keyCode === 13) { onChange(e.target.value); } }} />
     <div className={style.message}>(Default bitrate: 10Mbit/s)</div>    
     <div className={style.message}>It's easy! Paste a media file link and press enter ;)</div>
    {loading && <Spinner />}
</div>;

Home.propTypes = {
};

export default Home;
