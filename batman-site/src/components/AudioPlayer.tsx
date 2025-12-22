import React, { useEffect, useRef } from 'react';

const AudioPlayer: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        // Autoplay policy usually requires interaction, but we'll try
        if (audioRef.current) {
            audioRef.current.volume = 0.3;
        }
    }, []);

    return (
        <div className="fixed bottom-6 left-6 z-[100] flex items-center gap-4 text-[10px] font-mono text-bat-silver bg-black/50 p-2 border border-white/5 backdrop-blur-sm rounded-full px-4">
            <audio
                ref={audioRef}
                src="/assets/Batman-BGM.webm"
                loop
                autoPlay
            />
            <div className="w-2 h-2 rounded-full bg-bat-red animate-pulse"></div>
            <span>SYSTEM AUDIO: ACTIVE</span>
        </div>
    );
};

export default AudioPlayer;
