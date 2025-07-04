"use client";
import {
  BellOff,
  BellRing,
  Pause,
  Play,
  RotateCcw,
  Calendar,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import NotificationSound from "../../public/notifications/notification-sound.mp3";
import ConfettiExplosion from "confetti-explosion-react";
import { TimeButton } from "@/components/TimeButton";

export default function Home() {
  const CIRCLE_LENGTH = 942;

  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(0);
  const [activeTime, setActiveTime] = useState(0);
  const [initialTime, setinitialTime] = useState(0);
  const [startTime, setStartTime] = useState(false);
  const [alarm, setAlarm] = useState(true);
  const audioPlayer = useRef<HTMLAudioElement>(null);
  const [isExploding, setIsExploding] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (progress === CIRCLE_LENGTH && time === 0) {
      setIsExploding(true);
      setTimeout(() => {
        setIsExploding(false);
        setProgress(0);
        setActiveTime(0);
      }, 3000);
    }
  }, [progress, time]);

  useEffect(() => {
    if (
      progress === CIRCLE_LENGTH &&
      alarm &&
      time === 0 &&
      audioPlayer.current
    ) {
      audioPlayer.current.play();
    }
  }, [progress, time, alarm]);

  useEffect(() => {
    if (time > 0 && startTime && progress <= CIRCLE_LENGTH) {
      const num = CIRCLE_LENGTH / initialTime;

      intervalRef.current = setInterval(() => {
        setTime((prev) => prev - 1000);
        setProgress((prev) => parseFloat((prev + num).toFixed(2)));
      }, 1000);
    }
    return () => clearInterval(intervalRef.current!);
  }, [time, startTime, progress, initialTime]);

  const formatTime = (t: number) => {
    const totalSeconds = Math.floor(t / 1000);
    const min = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const sec = String(totalSeconds % 60).padStart(2, "0");

    return `${min}:${sec}`;
  };

  const handleSetTime = (t: number) => {
    const time = t * 1000;
    setTime(time);
    setActiveTime(t);
    setinitialTime(t);
    setProgress(0);
    setStartTime(false);
  };

  const handleAddToGoogleCalendar = () => {
    const title = encodeURIComponent("Mindfulness");

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}`;

    window.open(
      url,
      "AddEventPopup",
      "width=600,height=600,scrollbars=yes,resizable=yes"
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 w-full overflow-hidden">
      {isExploding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none overflow-hidden">
          <ConfettiExplosion />
        </div>
      )}
      <div className="flex justify-center flex-col items-center">
        <div className="flex justify-center w-100 text-[#FFF] text-2xl">
          My Mindfulness
        </div>
        <svg className="h-96 w-96">
          <g transform="rotate(-90 100 100)">
            <circle
              r="150"
              strokeLinecap="round"
              cx="10"
              cy="192"
              fill="#292929"
              stroke="#3A3737"
              strokeWidth="10"
              strokeDasharray={CIRCLE_LENGTH}
              strokeDashoffset="0"
            ></circle>
            <circle
              r="150"
              strokeLinecap="round"
              cx="10"
              cy="192"
              fill="transparent"
              stroke="#46EE6A"
              strokeWidth="10"
              strokeDasharray={CIRCLE_LENGTH}
              strokeDashoffset={progress}
            ></circle>
          </g>
          <text
            x="50%"
            y="50%"
            dominantBaseline="central"
            fill="#EBEBEB"
            textAnchor="middle"
            className="text-6xl"
          >
            {formatTime(time)}
          </text>
        </svg>
        <div className="flex justify-center gap-8">
          <TimeButton
            label="5 min"
            seconds={300}
            activeTime={activeTime}
            onClick={handleSetTime}
          />
          <TimeButton
            label="10 min"
            seconds={600}
            activeTime={activeTime}
            onClick={handleSetTime}
          />
          <TimeButton
            label="15 min"
            seconds={900}
            activeTime={activeTime}
            onClick={handleSetTime}
          />
          <TimeButton
            label="20 min"
            seconds={1200}
            activeTime={activeTime}
            onClick={handleSetTime}
          />
        </div>
        <div className="flex items-center mt-8">
          <div className="flex justify-between rounded-[40px] bg-[#313131] w-60">
            <button
              onClick={() => handleSetTime(initialTime)}
              className="p-4 flex justify-center flex-1 text-[#EBEBEB] border-r border-[#3E3838] cursor-pointer hover:opacity-70"
            >
              <RotateCcw />
            </button>
            <button
              onClick={() => setStartTime(!startTime)}
              className="p-4 flex justify-center flex-1 text-[#EBEBEB] border-r border-[#3E3838] cursor-pointer hover:opacity-70"
            >
              {startTime && time > 0 ? <Pause /> : <Play />}
            </button>
            <button
              onClick={() => setAlarm(!alarm)}
              className="p-4 flex justify-center flex-1 text-[#EBEBEB] cursor-pointer hover:opacity-70"
            >
              {!alarm ? <BellOff /> : <BellRing />}
            </button>
          </div>
          <button
            onClick={handleAddToGoogleCalendar}
            className="ml-4 flex text-[#EBEBEB] bg-[#313131] border-[#3E3838] rounded-[40px] p-4 cursor-pointer hover:opacity-70"
          >
            <Calendar />
          </button>
        </div>
      </div>
      {<audio ref={audioPlayer} src={NotificationSound} />}
    </main>
  );
}
