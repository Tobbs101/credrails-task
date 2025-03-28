/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback, useRef, ReactNode } from "react";
import { useIdleTimer } from "react-idle-timer";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import InactivityModal from "@/components/custom/misc/InactivityModal";
import SessionTimeoutModal from "@/components/custom/misc/SessionTimeoutModal";

const TimeOutProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(0);
  const [idleTimeLeft, setIdleTimeLeft] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showSessionTimeoutModal, setShowSessionTimeoutModal] = useState(false);
  const [timeoutModalShown, setTimeoutModalShown] = useState(false);

  const blockTime = 5 * 60 * 1000; // 5 minutes in ms

  const sessionTime = Math.max(
    0,
    moment().diff(
      new Date(localStorage.getItem("credit_collections_session_expiry") ?? ""),
      "milliseconds"
    )
  );

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const logout = useCallback(() => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/auth/login");
    window.location.reload();
  }, [navigate]);

  const onIdlePrompt = () => {
    setShowModal(true);
  };

  const { activate, getRemainingTime } = useIdleTimer({
    onIdle: logout,
    onPrompt: onIdlePrompt,
    timeout: 60 * 60 * 1000, // 60 minutes
    promptBeforeIdle: blockTime, // Trigger onPrompt 5 minutes before timeout
    events: [
      "mousemove",
      "keydown",
      "wheel",
      "mousedown",
      "touchstart",
      "focus",
    ],
    debounce: 200,
    element: document,
    startOnMount: true,
    stopOnIdle: false,
    crossTab: false,
    syncTimers: 0,
  });

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft(Math.ceil(sessionTime / 1000));
      setIdleTimeLeft(Math.ceil(getRemainingTime() / 1000));
    }, 500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [sessionTime, getRemainingTime]);

  useEffect(() => {
    if (timeLeft === 300 && !timeoutModalShown) {
      setShowSessionTimeoutModal(true);
      setTimeoutModalShown(true);
    }
  }, [timeLeft, timeoutModalShown]);

  const handleClose = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/auth/login");
    window.location.reload();
  };

  return (
    <>
      <InactivityModal
        showModal={showModal}
        setShowModal={setShowModal}
        onSignOut={logout}
        timeLeft={idleTimeLeft}
        onDismiss={activate}
      />
      <SessionTimeoutModal
        showModal={showSessionTimeoutModal}
        setShowModal={setShowSessionTimeoutModal}
        onClose={handleClose}
        timeLeft={timeLeft}
      />

      {children}
    </>
  );
};

export default TimeOutProvider;
