import { useState, useEffect } from 'react';
import { Button, Badge, Card, Alert } from 'react-bootstrap';
import { voiceService } from '../../services/voiceService';

/**
 * VoiceControl Component
 * Provides voice command interface and text-to-speech functionality
 */
function VoiceControl({ onCommand }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  const [supported, setSupported] = useState({ synthesis: false, recognition: false });

  useEffect(() => {
    const support = voiceService.isSupported();
    setSupported(support);
  }, []);

  const handleStartListening = () => {
    const started = voiceService.startListening(
      (text) => {
        setTranscript(text);
        setIsListening(false);
        
        const command = voiceService.parseCommand(text);
        if (command.action !== 'unknown') {
          voiceService.speak(`Processing ${command.action} command`);
          onCommand && onCommand(command);
        } else {
          voiceService.speak('Command not recognized. Please try again.');
        }
      },
      (err) => {
        setError(err.message || 'Voice recognition error');
        setIsListening(false);
      }
    );

    if (started) {
      setIsListening(true);
      setError(null);
      setTranscript('');
    }
  };

  const handleStopListening = () => {
    voiceService.stopListening();
    setIsListening(false);
  };

  const testVoice = () => {
    voiceService.speak('Voice control is working. You can now use voice commands.');
  };

  if (!supported.synthesis && !supported.recognition) {
    return (
      <Alert variant="warning">
        Voice features are not supported in your browser. Please use Chrome or Edge.
      </Alert>
    );
  }

  return (
    <Card className="voice-control-card mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="mb-1">🎤 Voice Control</h5>
            <small className="text-muted">
              {supported.recognition ? 'Say commands like "take medication" or "show list"' : 'Text-to-speech only'}
            </small>
          </div>
          <Badge bg={isListening ? 'danger' : 'secondary'}>
            {isListening ? 'Listening...' : 'Ready'}
          </Badge>
        </div>

        {error && (
          <Alert variant="danger" onClose={() => setError(null)} dismissible className="mb-3">
            {error}
          </Alert>
        )}

        {transcript && (
          <Alert variant="info" className="mb-3">
            <strong>You said:</strong> "{transcript}"
          </Alert>
        )}

        <div className="d-flex gap-2">
          {supported.recognition && (
            <>
              {!isListening ? (
                <Button variant="primary" onClick={handleStartListening}>
                  🎤 Start Voice Command
                </Button>
              ) : (
                <Button variant="danger" onClick={handleStopListening}>
                  ⏹️ Stop Listening
                </Button>
              )}
            </>
          )}
          
          {supported.synthesis && (
            <Button variant="outline-secondary" onClick={testVoice}>
              🔊 Test Voice
            </Button>
          )}
        </div>

        <div className="mt-3">
          <small className="text-muted">
            <strong>Available commands:</strong> take medication, refill, add medication, show list, help
          </small>
        </div>
      </Card.Body>
    </Card>
  );
}

export default VoiceControl;
