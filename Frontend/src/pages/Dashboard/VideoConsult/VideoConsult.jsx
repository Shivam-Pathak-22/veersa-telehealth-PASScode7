import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const VideoConsult = () => {
  const location = useLocation();
  const { department, consultationId } = location.state || {};
  const jitsiContainerRef = useRef(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    // Load Jitsi Meet API script dynamically if not already loaded
    const loadJitsiScript = () => {
      return new Promise((resolve, reject) => {
        if (window.JitsiMeetExternalAPI) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = 'https://meet.jit.si/external_api.js';
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    let api = null;

    loadJitsiScript()
      .then(() => {
        if (!jitsiContainerRef.current) {
          setLoadError(true);
          return;
        }

        const domain = 'meet.jit.si';

        // Replace this with your JWT token if using JWT auth on your Jitsi server
        const jwtToken = null; // e.g. 'eyJhbGciOiJI...'

        // Responsive height: 500px on small screens, 700px on larger screens
        const height = window.innerWidth < 768 ? 500 : 700;

        const options = {
          roomName: `ConsultRoom-${consultationId || 'default'}`,
          width: '100%',
          height,
          parentNode: jitsiContainerRef.current,
          jwt: jwtToken || undefined,  // only add if JWT token is available
          configOverwrite: {
            // Add any config overrides here
          },
          interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            DEFAULT_REMOTE_DISPLAY_NAME: 'Patient',
            TOOLBAR_BUTTONS: [
              'microphone', 'camera', 'fullscreen',
              'fodeviceselection', 'hangup', 'chat',
              'settings', 'videoquality', 'tileview', 'transcribing'
            ],
          },
          userInfo: {
            email: 'doctor@example.com',   // Replace with actual user email
            displayName: 'Dr. Sharma',     // Replace with actual display name
          },
        };

        api = new window.JitsiMeetExternalAPI(domain, options);

        api.addEventListener('videoConferenceJoined', () => {
          console.log('Jitsi Meet started');
        });

        api.addEventListener('readyToClose', () => {
          // Handle meeting end event if needed
          console.log('Meeting ended');
        });
      })
      .catch((error) => {
        console.error('Failed to load Jitsi Meet script', error);
        setLoadError(true);
      });

    // Cleanup on component unmount
    return () => {
      if (api) api.dispose();
    };
  }, [consultationId]);

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
        <p className="text-red-600 font-semibold text-lg">
          Failed to load video consultation. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-6 text-indigo-700">
        Your Video Consultation {department ? `- ${department}` : ''}
      </h1>
      <div
        id="jitsi-container"
        ref={jitsiContainerRef}
        className="w-full max-w-6xl rounded-lg shadow-lg overflow-hidden"
        style={{ minHeight: 500, height: 'auto' }}
      />
    </div>
  );
};

export default VideoConsult;
