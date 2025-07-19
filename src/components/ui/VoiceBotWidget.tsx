const VoiceBotWidget = () => {
  return (
    <iframe 
      src="https://iframes.ai/o/1752815276551x600093233708531700?color=10A37F&icon=calendar"
      allow="microphone"
      loading="eager"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '200px',
        height: '200px',
        border: 'none',
        zIndex: 50
      }}
      id="assistantFrame"
      title="Asistente Virtual de NeuroInnova - Agendar Consulta"
    />
  );
};

export default VoiceBotWidget;