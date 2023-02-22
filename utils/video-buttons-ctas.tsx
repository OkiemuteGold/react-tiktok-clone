import { useState, useRef } from "react";

const VideoButtonsCtas = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);

    const pausePlayVideo = () => {
        if (isPlaying) {
            videoRef.current?.pause();
            setIsPlaying(false);
        } else {
            videoRef.current?.play();
            setIsPlaying(true);
        }
    };

    const muteUnmuteVideo = () => {
        console.log(videoRef);

        if (isMuted) {
            // !videoRef.current?.muted;
            setIsMuted(false);
        } else {
            // videoRef.current?.muted;
            setIsMuted(true);
        }
    };

    return { videoRef, isPlaying, setIsPlaying, pausePlayVideo, isMuted, setIsMuted, muteUnmuteVideo }
}

export default VideoButtonsCtas;
