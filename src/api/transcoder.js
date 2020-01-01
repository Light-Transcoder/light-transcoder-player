import { API_URL } from "../config";
import { createCompatibilityMap } from "./codecMap";

export const analyze = async (url) => {
    const data = fetch(`${API_URL}media/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            url,
            supported: createCompatibilityMap()
        })
    }).then(d => d.json())
    return data;
}

export const start = async (url = '', profile = 0, videoTrack = 0, audioTracks = [0], subTracks = []) => {
    const data = fetch(`${API_URL}session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            url,
            profile,
            video: videoTrack,
            audio: audioTracks[0],
            subtitle: '',
            supported: createCompatibilityMap()
        })
    }).then(d => d.json())
    return data;
}

export const autoStart = async (url, maxBitrate = 15000) => {
    console.log(`Selecting profiles matching with maxBitrate=${maxBitrate}`);
    const data = await analyze(url);
    const profiles = data.profiles.filter((p) => (p.bitrate <= maxBitrate));
    console.log('File scan', data)
    const startData = await start(url, profiles[profiles.length - 1].id, data.tracks.video[0].id, data.tracks.audio.map((a) => (a.id)), []);
    console.log('Session', startData);
    return startData;
}