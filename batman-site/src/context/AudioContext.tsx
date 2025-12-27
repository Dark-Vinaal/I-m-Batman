import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface AudioContextType {
    isMuted: boolean;
    isPlaying: boolean;
    toggleMute: () => void;
    togglePlay: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false); // Default to false until user interacts or autoplay works

    useEffect(() => {
        // Create audio element
        const audio = new Audio('/assets/batmanbgm.mp3');
        audio.loop = true;
        audio.volume = 0.6; // Increased loudness as requested (60% volume)
        audioRef.current = audio;

        // Try to play automatically
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                setIsPlaying(true);
            }).catch((error) => {
                console.log("Autoplay prevented:", error);
                setIsPlaying(false);
            });
        }

        return () => {
            audio.pause();
            audio.src = "";
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = isMuted;
        }
    }, [isMuted]);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => console.error("Play failed:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    const toggleMute = () => {
        setIsMuted(prev => !prev);
    };

    const togglePlay = () => {
        setIsPlaying(prev => !prev);
    };

    return (
        <AudioContext.Provider value={{ isMuted, isPlaying, toggleMute, togglePlay }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
};
