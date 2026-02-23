import { createContext, useContext, useRef, useCallback } from "react";

interface VideoPlayerContextType {
  registerPlay: (id: string, pauseFn: () => void) => void;
  unregister: (id: string) => void;
}

const VideoPlayerContext = createContext<VideoPlayerContextType>({
  registerPlay: () => {},
  unregister: () => {},
});

export const useVideoPlayer = () => useContext(VideoPlayerContext);

export const VideoPlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const activeRef = useRef<{ id: string; pause: () => void } | null>(null);

  const registerPlay = useCallback((id: string, pauseFn: () => void) => {
    if (activeRef.current && activeRef.current.id !== id) {
      activeRef.current.pause();
    }
    activeRef.current = { id, pause: pauseFn };
  }, []);

  const unregister = useCallback((id: string) => {
    if (activeRef.current?.id === id) {
      activeRef.current = null;
    }
  }, []);

  return (
    <VideoPlayerContext.Provider value={{ registerPlay, unregister }}>
      {children}
    </VideoPlayerContext.Provider>
  );
};
