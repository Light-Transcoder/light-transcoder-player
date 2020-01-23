const testCodec = (type) => {
    return document.createElement('video').canPlayType(type);
}

// Audio codec detection
const canPlayAc3 = () => (testCodec('audio/mp4; codecs="ac3"'));
const canPlayEc3 = () => (testCodec('audio/mp4; codecs="ec3"'));
const canPlayOpus = () => (testCodec('audio/mp4; codecs="opus"') || testCodec('audio/webm; codecs="opus"'));
const canPlayFlac = () => (testCodec('audio/mp4; codecs="flac"'));
const canPlayVorbis = () => (testCodec('audio/webm; codecs="vorbis"'));

// Video codec detection
const canPlayHevc = () => (testCodec('video/mp4; codecs="hev1.1.6.L93.90"') || testCodec('video/mp4; codecs="hvc1.1.6.L93.90"'));
const canPlayAv1 = () => (testCodec('video/mp4; codecs="av01.0.01M.08"'));
const canPlayVp8 = () => (testCodec('video/webm; codecs="vp8"'));
const canPlayVp9 = () => (testCodec('video/mp4; codecs="vp9"') || testCodec('video/mp4; codecs="vp09.00.10.08"') || testCodec('video/webm; codecs="vp9"') || testCodec('video/webm; codecs="vp09.00.10.08"'));

// Generate compatibility map for API
export const createCompatibilityMap = () => ([
    // We prefer DASH/DOWNLOAD <3
    /*{
        type: "HLS",
        // Video codecs supported by HLS: H264, HEVC
        video: [
            { codec: "h264" }, // All modern browsers supports H264
            ...((canPlayHevc()) ? [{ codec: "hevc" }] : []), // Supported by Microsoft Edge
        ],
        // Audio codecs supported by HLS: MP3, AC3 (Dolby Digital), EC3 (Dolby Digital Plus), AAC (AAC-LC, HE-AAC1, HE-AAC2)
        audio: [
            { codec: "mp3" }, // All modern browsers supports MP3
            { codec: "aac" }, // All modern browsers supports AAC
            ...(canPlayAc3() ? [{ codec: "ac3" }] : []), // Supported by Microsoft Edge
            ...(canPlayEc3() ? [{ codec: "ec3" }] : []), // Supported by Microsoft Edge
        ]
    },*/ {
        type: "DOWNLOAD",
        format: [
            { container: "mp4" },
            { container: "webm" },
        ],
        video: [
            { codec: "h264" }, // All modern browsers supports H264
            ...(canPlayHevc() ? [{ codec: "hevc" }] : []), // Supported by Microsoft Edge
            ...(canPlayAv1() ? [{ codec: "av1" }] : []), // Supported by Chrome and Firefox
            ...(canPlayVp8() ? [{ codec: "vp8" }] : []), // Supported by Chrome, Firefox and Microsoft Edge
            ...(canPlayVp9() ? [{ codec: "vp9" }] : []), // Supported by Chrome and Firefox
        ],
        audio: [ // Audio codecs supported by HLS: MP3, AC3 (Dolby Digital), EC3 (Dolby Digital Plus), AAC (AAC-LC, HE-AAC1, HE-AAC2)
            { codec: "mp3" }, // All modern browsers supports MP3
            { codec: "aac" }, // All modern browsers supports AAC
            ...(canPlayAc3() ? [{ codec: "ac3" }] : []), // Supported by Microsoft Edge
            ...(canPlayEc3() ? [{ codec: "ec3" }] : []), // Supported by Microsoft Edge
            ...(canPlayOpus() ? [{ codec: "opus" }] : []), // Supported by Chrome, Firefox and Microsoft Edge
            ...(canPlayFlac() ? [{ codec: "flac" }] : []), // Supported by Chrome, Firefox and Microsoft Edge
            ...(canPlayVorbis() ? [{ codec: "vorbis" }] : []), // Supported by Chrome, Firefox and Microsoft Edge
        ],
        maxAudioTrack: 1,
        maxVideoTrack: 1
    }, {
        type: "DASH",
        video: [
            { codec: "h264" }, // All modern browsers supports H264
            ...(canPlayHevc() ? [{ codec: "hevc" }] : []), // Supported by Microsoft Edge
            ...(canPlayAv1() ? [{ codec: "av1" }] : []), // Supported by Chrome and Firefox
            ...(canPlayVp8() ? [{ codec: "vp8" }] : []), // Supported by Chrome, Firefox and Microsoft Edge
            ...(canPlayVp9() ? [{ codec: "vp9" }] : []), // Supported by Chrome and Firefox
        ],
        audio: [ // Audio codecs supported by HLS: MP3, AC-3 (Dolby Digital), EC-3 (Dolby Digital Plus), AAC (AAC-LC, HE-AAC1, HE-AAC2)
            { codec: "mp3" }, // All modern browsers supports MP3
            { codec: "aac" }, // All modern browsers supports AAC
            ...(canPlayAc3() ? [{ codec: "ac3" }] : []), // Supported by Microsoft Edge
            ...(canPlayEc3() ? [{ codec: "ec3" }] : []), // Supported by Microsoft Edge
            ...(canPlayOpus() ? [{ codec: "opus" }] : []), // Supported by Chrome, Firefox and Microsoft Edge
            ...(canPlayFlac() ? [{ codec: "flac" }] : []), // Supported by Chrome, Firefox and Microsoft Edge
            ...(canPlayVorbis() ? [{ codec: "vorbis" }] : []), // Supported by Chrome, Firefox and Microsoft Edge
        ]
    }
]);

console.log('COMPATIBILITY_MAP', createCompatibilityMap());