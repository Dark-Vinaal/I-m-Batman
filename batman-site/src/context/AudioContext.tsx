import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface AudioContextType {
    isMuted: boolean;
    toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType>({ isMuted: false, toggleMute: () => { } });

export const useAudio = () => useContext(AudioContext);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Create audio element
        const audio = new Audio('/assets/batmanbgm.mp3');
        audio.loop = true;
        audio.volume = 0.3;
        audioRef.current = audio;

        // Attempt autoplay
        const playAudio = async () => {
            try {
                await audio.play();
            } catch (err) {
                // Autoplay blocked, wait for user interaction
                const handleInteraction = async () => {
                    try {
                        await audio.play();
                        document.removeEventListener('click', handleInteraction);
                        document.removeEventListener('keydown', handleInteraction);
                    } catch (e) {
                        console.log('Audio play failed:', e);
                    }
                };
                document.addEventListener('click', handleInteraction);
                document.addEventListener('keydown', handleInteraction);
            }
        };

        playAudio();

        // Cleanup on unmount
        return () => {
            audio.pause();
            audio.src = '';
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = isMuted;
        }
    }, [isMuted]);

    const toggleMute = () => {
        setIsMuted(prev => !prev);
    };

    return (
        <AudioContext.Provider value={{ isMuted, toggleMute }}>
            {children}
        </AudioContext.Provider>
    );
};
