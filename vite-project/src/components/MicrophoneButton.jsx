import React, { useRef, useState } from 'react';
import '../landing-page.css';

const MicrophoneButton = () => {
  const recognitionRef = useRef(null);
  const [popup, setPopup] = useState(null);   // Holds final recognized speech for popup display
  const [listening, setListening] = useState(false);   // Tracks whether the mic is actively listening
  const [interim, setInterim] = useState('');   // Shows the "live speech" while the user is still speaking

  const handleMicClick = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // Checking if the browser supports web speech API
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser.');
      return;
    }   
    // Initialise SpeechRecognition 
    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false; // Stop after the user pauses speaking
      recognitionRef.current.interimResults = true; // Return real-time results
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.onstart = () => setListening(true); 
      recognitionRef.current.onend = () => {
        setListening(false);
        setInterim('');
      };
        // Process speech results
      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';
        // Loop through all recognition results to seperate interim and final results
        for (let i = 0; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        // Update interim transcript for live feedback
        if (interimTranscript) setInterim(interimTranscript);
        if (finalTranscript) { // When final transcript is ready 
          setPopup(finalTranscript);
          setInterim('');
          setTimeout(() => setPopup(null), 3000); // Auto-hide popup after 3 seconds
          // Navigation logic
          const lower = finalTranscript.toLowerCase();
          if (lower.includes('browse games')) {
            window.location.href = '/browse-games';
          } else if (lower.includes('register')) {
            window.location.href = '/register';
          } else if (lower.includes('login')) {
            window.location.href = '/login';
          } else if (lower.includes('home') || lower.includes('landing')) {
            window.location.href = '/';
          } else {
            alert('Sorry, command not recognized. Try: "take me to browse games", "register", "login", or "home".');
          }
        }
      };
    }
    // Clear previous popup and interim text when mic is clicked again
    setPopup(null);
    setInterim('');
    recognitionRef.current.start(); // Start speech recognition (listening)
  };

  return (
    <>
      <button
        onClick={handleMicClick}
        aria-label="Activate voice search"
        className={`mic-fab${listening ? ' mic-fab-listening' : ''}`}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none"> {/* Microphone icon */}
          <circle cx="12" cy="12" r="12" fill="#000" />
          <rect x="9" y="4" width="6" height="10" rx="3" fill="#fff" />
          <rect x="11" y="16" width="2" height="3" rx="1" fill="#fff" />
          <rect x="8" y="21" width="8" height="2" rx="1" fill="#fff" />
        </svg>
        <span className="mic-fab-tooltip">Voice Commands</span>
      </button>
      {(interim || popup) && ( // Real time transcript and Popup display
        <div className="mic-popup">
          {interim ? <span className="mic-popup-interim">{interim}</span> : popup}
        </div>
      )}
    </>
  );
};

export default MicrophoneButton;
