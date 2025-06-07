import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaPause, FaPlay, FaVolumeDown, FaVolumeMute } from 'react-icons/fa';
import styled from 'styled-components';

const LoadingSpinner = styled(motion.div)`
  width: 12px;
  height: 12px;
  border: 2px solid ${({ theme }) => theme.colors.primary}40;
  border-top: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
`;

const MusicPlayerContainer = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  background: ${({ theme }) => theme.colors.surface};
  padding: 0.5rem;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows.glow};
  border: 1px solid ${({ theme }) => theme.colors.primary}40;
  z-index: 100;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    bottom: 1rem;
    left: 1rem;
  }
`;

const IconButton = styled(motion.button)`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}20;
  }
`;

const VolumeSlider = styled.input`
  width: 60px;
  height: 4px;
  -webkit-appearance: none;
  background: ${({ theme }) => theme.colors.primary}40;
  border-radius: 2px;
  outline: none;
  opacity: 0;
  transition: all 0.3s ease;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }

  ${MusicPlayerContainer}:hover & {
    opacity: 1;
    width: 80px;
  }
`;

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playAttemptRef = useRef(false);

  useEffect(() => {
    // Create audio element with optimized settings
    audioRef.current = new Audio('/music/calm-background.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    audioRef.current.preload = "metadata"; // Only load metadata initially
    
    const audio = audioRef.current;

    const handleCanPlay = () => {
      setIsLoading(false);
      if (playAttemptRef.current) {
        audio?.play()
          .catch(handlePlayError);
      }
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handlePlaying = () => {
      setIsLoading(false);
      setError(null);
    };

    const handleError = (e: ErrorEvent) => {
      setIsLoading(false);
      setError("Failed to load audio");
      console.error("Audio error:", e);
    };

    // Handle buffering and loading events
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('error', handleError);

    // Optimize buffering with media source buffer size
    if ('webkitAudioContext' in window) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContext.createMediaElementSource(audio);
    }

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('error', handleError);
      audio.src = '';
      audio.load();
    };
  }, []);

  const handlePlayError = (error: Error) => {
    if (error.name === 'NotAllowedError') {
      setError("Please interact with the page first");
    } else {
      setError("Failed to play audio");
    }
    setIsPlaying(false);
    console.error("Playback error:", error);
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        await audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        playAttemptRef.current = true;
        if (audioRef.current.readyState >= 2) {
          await audioRef.current.play();
          setIsPlaying(true);
        }
        // If not ready, it will play when canplay event fires
      }
    } catch (error) {
      handlePlayError(error as Error);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  return (
    <MusicPlayerContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <IconButton onClick={togglePlay} disabled={isLoading}>
        {isLoading ? (
          <LoadingSpinner
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        ) : isPlaying ? (
          <FaPause />
        ) : (
          <FaPlay />
        )}
      </IconButton>
      
      <IconButton onClick={toggleMute}>
        {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeDown />}
      </IconButton>
      
      <VolumeSlider
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
      />
      
      {error && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ 
            fontSize: '0.8rem', 
            color: 'red',
            padding: '0 0.5rem'
          }}
        >
          {error}
        </motion.span>
      )}
    </MusicPlayerContainer>
  );
};

export default MusicPlayer;
