/**
 * Voice Service - Text-to-Speech and Speech Recognition
 * High-level feature using Web Speech API
 */

class VoiceService {
  constructor() {
    this.synthesis = window.speechSynthesis;
    this.recognition = null;
    this.isListening = false;

    // Initialize Speech Recognition if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
    }
  }

  /**
   * Speak text using text-to-speech
   * @param {string} text - Text to speak
   * @param {object} options - Voice options (rate, pitch, volume)
   * @returns {Promise<void>}
   */
  speak(text, options = {}) {
    return new Promise((resolve, reject) => {
      if (!this.synthesis) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      // Cancel any ongoing speech
      this.synthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = options.rate || 1.0;
      utterance.pitch = options.pitch || 1.0;
      utterance.volume = options.volume || 1.0;

      utterance.onend = () => resolve();
      utterance.onerror = (error) => reject(error);

      this.synthesis.speak(utterance);
    });
  }

  /**
   * Stop current speech
   */
  stopSpeaking() {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }

  /**
   * Announce medication reminder
   * @param {object} medication - Medication object
   * @returns {Promise<void>}
   */
  async announceMedication(medication) {
    const text = `Time to take ${medication.name}, ${medication.dosage} milligrams`;
    return this.speak(text);
  }

  /**
   * Announce low stock warning
   * @param {object} medication - Medication object
   * @returns {Promise<void>}
   */
  async announceLowStock(medication) {
    const text = `Warning: ${medication.name} is running low. Only ${medication.currentPills} pills remaining`;
    return this.speak(text);
  }

  /**
   * Confirm action with voice
   * @param {string} action - Action performed
   * @returns {Promise<void>}
   */
  async confirmAction(action) {
    return this.speak(`${action} confirmed`);
  }

  /**
   * Start listening for voice commands
   * @param {function} onResult - Callback for recognized speech
   * @param {function} onError - Callback for errors
   * @returns {boolean} - Whether listening started successfully
   */
  startListening(onResult, onError) {
    if (!this.recognition) {
      onError && onError(new Error('Speech recognition not supported'));
      return false;
    }

    if (this.isListening) {
      return false;
    }

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      onResult && onResult(transcript);
    };

    this.recognition.onerror = (event) => {
      this.isListening = false;
      onError && onError(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    try {
      this.recognition.start();
      this.isListening = true;
      return true;
    } catch (error) {
      onError && onError(error);
      return false;
    }
  }

  /**
   * Stop listening for voice commands
   */
  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  /**
   * Process voice command
   * @param {string} command - Voice command text
   * @returns {object} - Parsed command object
   */
  parseCommand(command) {
    const lowerCommand = command.toLowerCase();

    if (lowerCommand.includes('take') || lowerCommand.includes('took')) {
      return { action: 'take', type: 'medication' };
    }

    if (lowerCommand.includes('refill')) {
      return { action: 'refill', type: 'medication' };
    }

    if (lowerCommand.includes('add') || lowerCommand.includes('new')) {
      return { action: 'add', type: 'medication' };
    }

    if (lowerCommand.includes('list') || lowerCommand.includes('show')) {
      return { action: 'list', type: 'medications' };
    }

    if (lowerCommand.includes('help')) {
      return { action: 'help', type: 'general' };
    }

    return { action: 'unknown', type: 'unknown' };
  }

  /**
   * Check if voice features are supported
   * @returns {object} - Support status
   */
  isSupported() {
    return {
      synthesis: !!this.synthesis,
      recognition: !!this.recognition,
    };
  }
}

export const voiceService = new VoiceService();
