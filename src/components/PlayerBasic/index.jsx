import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.css';

const PlayerBasic = ({ url = '' }) =>  <video src={url} className={style.player} autoPlay width="1920" height="1080" controls/>;

PlayerBasic.propTypes = {
    url: PropTypes.string
};

export default PlayerBasic;
