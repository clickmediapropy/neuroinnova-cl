import { useEffect, useRef } from "react";

const VoiceBotWidget = () => {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    
    if (frame) {
      const handleLoad = () => {
        if (navigator.permissions && navigator.permissions.query) {
          navigator.permissions.query({ name: 'microphone' as PermissionName })
            .then(result => {
              if (result.state === 'granted') {
                console.log('Microphone access already granted');
              } else if (result.state === 'prompt') {
                console.log('User will be prompted for microphone access');
              }
            })
            .catch(err => {
              console.log('Permission query not supported:', err);
            });
        }
      };

      frame.addEventListener('load', handleLoad);
      
      return () => {
        frame.removeEventListener('load', handleLoad);
      };
    }
  }, []);

  return (
    <iframe 
      ref={frameRef}
      src="https://iframes.ai/o/1752815276551x600093233708531700?color=10A37F&icon="
      allow="microphone"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '100%',
        maxWidth: '200px',
        height: '200px',
        border: 'none',
        zIndex: 50
      }}
      id="assistantFrame"
      title="Asistente Virtual de NeuroInnova"
    />
  );
};

export default VoiceBotWidget;