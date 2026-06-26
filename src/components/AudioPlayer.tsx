import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Gauge, X, Music } from 'lucide-react';
import { Audiobook, AudiobookTrack } from '../types';

interface AudioPlayerProps {
  activeTrack: AudiobookTrack | null;
  activeBook: Audiobook | null;
  playlist: AudiobookTrack[];
  onClose: () => void;
  onTrackChange: (track: AudiobookTrack, book: Audiobook) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  activeTrack,
  activeBook,
  playlist,
  onClose,
  onTrackChange
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isSpeedOpen, setIsSpeedOpen] = useState(false);

  // Initialize and handle track source changes
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;

    // Track state listeners
    const handleCanPlay = () => {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.log("Auto-play blocked or audio error:", err);
          setIsPlaying(false);
        });
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      handleNext();
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);

    if (activeTrack) {
      audio.src = activeTrack.url;
      audio.load();
      audio.playbackRate = playbackRate;
      audio.volume = isMuted ? 0 : volume;
    }

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, [activeTrack]);

  // Handle Play/Pause
  const togglePlay = () => {
    if (!audioRef.current || !activeTrack) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  // Handle Volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (audioRef.current) {
      audioRef.current.volume = val;
      audioRef.current.muted = val === 0;
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    audioRef.current.muted = nextMute;
    audioRef.current.volume = nextMute ? 0 : volume;
  };

  // Handle Playback Speed
  const handleSpeedChange = (rate: number) => {
    setPlaybackRate(rate);
    setIsSpeedOpen(false);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  // Handle Progress Seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  // Skip tracks
  const handleNext = () => {
    if (!activeTrack || !activeBook || playlist.length <= 1) return;
    const currentIndex = playlist.findIndex(t => t.title === activeTrack.title);
    if (currentIndex !== -1 && currentIndex < playlist.length - 1) {
      onTrackChange(playlist[currentIndex + 1], activeBook);
    } else {
      // Loop back to start
      onTrackChange(playlist[0], activeBook);
    }
  };

  const handlePrev = () => {
    if (!activeTrack || !activeBook || playlist.length <= 1) return;
    const currentIndex = playlist.findIndex(t => t.title === activeTrack.title);
    if (currentIndex > 0) {
      onTrackChange(playlist[currentIndex - 1], activeBook);
    } else {
      // Go to last
      onTrackChange(playlist[playlist.length - 1], activeBook);
    }
  };

  // Format seconds to MM:SS
  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!activeTrack || !activeBook) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 150 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-devotional-blue-dark text-parchment-light border-t border-gold-base/30 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] px-4 py-3 md:py-4"
        id="persistent-audio-player"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Metadata Display */}
          <div className="flex items-center gap-3 w-full md:w-1/3">
            <div className={`w-12 h-12 rounded-md ${activeBook.coverImage} flex items-center justify-center border border-gold-base/40 relative overflow-hidden shrink-0`}>
              <div className="absolute inset-0 bg-black/10"></div>
              {isPlaying ? (
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                  className="relative z-10"
                >
                  <Music className="w-5 h-5 text-gold-light opacity-90" />
                </motion.div>
              ) : (
                <Music className="w-5 h-5 text-gold-light opacity-90 relative z-10" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-display text-gold-light font-bold truncate leading-tight">
                {activeTrack.title}
              </h4>
              <p className="text-xs text-parchment-dark/70 truncate mt-0.5">
                {activeBook.title} • Narrated by {activeTrack.narrator}
              </p>
            </div>
          </div>

          {/* Controls & Progress bar */}
          <div className="flex flex-col items-center gap-1.5 w-full md:w-2/5">
            <div className="flex items-center gap-5">
              <button
                onClick={handlePrev}
                disabled={playlist.length <= 1}
                className="text-parchment-dark/75 hover:text-gold-light disabled:opacity-40 transition"
                aria-label="Previous track"
                id="btn-prev-track"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-gold-base hover:bg-gold-light text-devotional-blue-dark flex items-center justify-center transition shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                aria-label={isPlaying ? "Pause track" : "Play track"}
                id="btn-play-pause-toggle"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current translate-x-0.5" />}
              </button>

              <button
                onClick={handleNext}
                disabled={playlist.length <= 1}
                className="text-parchment-dark/75 hover:text-gold-light disabled:opacity-40 transition"
                aria-label="Next track"
                id="btn-next-track"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Scrubber */}
            <div className="flex items-center gap-2.5 w-full">
              <span className="text-xs font-mono text-parchment-dark/65 w-10 text-right">
                {formatTime(currentTime)}
              </span>
              <div className="flex-1 relative group py-2">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 bg-parchment-dark/20 rounded-lg appearance-none cursor-pointer accent-gold-base group-hover:accent-gold-light focus:outline-none transition"
                  id="audio-seek-slider"
                />
              </div>
              <span className="text-xs font-mono text-parchment-dark/65 w-10">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Speed, Volume, and Close Controls */}
          <div className="flex items-center justify-end gap-4 w-full md:w-1/3">
            {/* Playback Speed Controller */}
            <div className="relative">
              <button
                onClick={() => setIsSpeedOpen(!isSpeedOpen)}
                className="flex items-center gap-1.5 px-2 py-1 rounded bg-devotional-blue-light/50 border border-gold-base/20 text-xs text-parchment-dark hover:text-gold-light transition cursor-pointer"
                title="Playback Speed"
                id="btn-playback-speed"
              >
                <Gauge className="w-3.5 h-3.5" />
                <span>{playbackRate === 1.0 ? 'Normal' : `${playbackRate}x`}</span>
              </button>

              <AnimatePresence>
                {isSpeedOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsSpeedOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full mb-2 right-0 z-50 bg-devotional-blue border border-gold-base/30 rounded-md shadow-lg py-1 w-24 text-center text-xs"
                    >
                      {[0.75, 1.0, 1.25, 1.5].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => handleSpeedChange(rate)}
                          className={`w-full py-1.5 px-3 block text-left hover:bg-gold-base/20 transition cursor-pointer ${playbackRate === rate ? 'text-gold-light font-bold bg-devotional-blue-light/65' : 'text-parchment-dark/80'}`}
                        >
                          {rate === 1.0 ? '1.0x Normal' : `${rate}x`}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2 group max-w-[120px]">
              <button
                onClick={toggleMute}
                className="text-parchment-dark/75 hover:text-gold-light transition"
                aria-label="Toggle mute"
                id="btn-toggle-mute"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 md:w-20 h-1 bg-parchment-dark/20 rounded-lg appearance-none cursor-pointer accent-gold-base hover:accent-gold-light focus:outline-none transition"
                id="volume-slider"
              />
            </div>

            {/* Separator */}
            <div className="h-4 w-[1px] bg-parchment-dark/20 hidden md:block" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="text-parchment-dark/60 hover:text-red-400 transition"
              aria-label="Close Player"
              id="btn-close-player"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};
