import React from 'react';

const Jitsi = (props) => {
  const jitsiContainerId = "jitsi";
  const [jitsi, setJitsi] = React.useState({});

  const loadJitsiScript = () => {
    let resolveLoadJitsiScriptPromise = null;

    const loadJitsiScriptPromise = new Promise((resolve) => {
      resolveLoadJitsiScriptPromise = resolve;
    });

    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = resolveLoadJitsiScriptPromise
    document.body.appendChild(script);

    return loadJitsiScriptPromise;
  };

  const initialiseJitsi = async () => {
    if (!window.JitsiMeetExternalAPI) {
      await loadJitsiScript();
    }

    const _jitsi = new window.JitsiMeetExternalAPI("meet.jit.si", {
      parentNode: document.getElementById(jitsiContainerId),
      roomName: props.roomName,
      configOverwrite: {
        prejoinPageEnabled: false
      },
      width: "100%",
      height: "100%",
    });

    setJitsi(_jitsi)
    _jitsi.executeCommand('toggleAudio');
    _jitsi.executeCommand('toggleVideo');
  };

  React.useEffect(() => {
    initialiseJitsi();

    return () => jitsi?.dispose?.();
  }, []);
  
  return <div id={jitsiContainerId} style={{ height: "50%", width: "99%" }}/>;
};

export default Jitsi;
