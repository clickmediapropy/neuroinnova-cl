const VoiceBotWidget = () => {
  return (
    <iframe 
      src="https://iframes.ai/o/1752815276551x600093233708531700?color=10A37F&icon=calendar"
      allow="microphone"
      loading="eager"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '120px',
        height: '120px',
        border: 'none',
        zIndex: 50
      }}
      id="assistantFrame"
      title="Asistente Virtual de NeuroInnova - Agendar Consulta"
    />
  );
};

export default VoiceBotWidget;