import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import "./api/codecMap";

// Default bitrate
window.bitrateLimit = 8000;

ReactDOM.render(<App />, document.getElementById('root'));