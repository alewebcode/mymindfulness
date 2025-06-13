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

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(1);
  const [time, setTime] = useState(0);
  const [activeTime, setActiveTime] = useState(0);
  const [initialTime, setinitialTime] = useState(0);
  const [startTime, setStartTime] = useState(false);
  const [alarm, setAlarm] = useState(true);
  const audioPlayer = useRef<HTMLAudioElement>(null);
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    if (progress === 942 && time === 0) {
      setIsExploding(true);
      setTimeout(() => {
        setIsExploding(false);
        setProgress(0);
        setActiveTime(0);
      }, 3000);
    }
    if (progress === 942 && alarm && time === 0) {
      if (audioPlayer.current) audioPlayer.current.play();
      setProgress(0);
      setActiveTime(0);
    }

    if (time > 0 && startTime) {
      const num = 942 / initialTime;

      if (progress <= 942) {
        let IdInterval = setInterval(() => {
          setCount((count) => count + 1);
          setTime((time) => time - 1000);
        }, 1000);

        setProgress(num * count);

        return () => {
          clearInterval(IdInterval);
        };
      }
    }
  }, [count, time, startTime, progress]);

  const formatTime = (t: number) => {
    let formatSecond = t / 1000;

    //let diff = formatSecond - (((Date.now() - Date.now()) / 1000) | 0);
    console.log(formatSecond);
    let min = Math.floor(formatSecond / 60);
    let seconds = Math.floor(formatSecond % 60);

    let formatMinutes = min < 10 ? "0" + min : min;
    let formatSeconds = seconds < 10 ? "0" + seconds : seconds;

    return `${formatMinutes}:${formatSeconds}`;
  };

  const handleSetTime = (t: number) => {
    const time = t * 1000;
    setCount(1);
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24 w-100">
      {isExploding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none overflow-hidden">
          <ConfettiExplosion />
        </div>
      )}
      <div className="flex justify-center flex-col items-center">
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
              strokeDasharray="942"
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
              strokeDasharray="942"
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
          <button
            onClick={() => handleSetTime(300)}
            className={`flex justify-center bg-[#313131] p-2 rounded-[20px] w-24 gap-1 cursor-pointer hover:opacity-75
                     active:bg-[#46EE6A] ${
                       activeTime > 0 && activeTime === 300
                         ? "bg-[#46EE6A] text-[#000]"
                         : "text-[#EBEBEB]"
                     }`}
          >
            5 min
          </button>
          <button onClick={() => handleSetTime(600)}>
            <div
              className={`flex justify-center bg-[#313131] p-2 rounded-[20px] w-24 gap-1 cursor-pointer hover:opacity-75
                     active:bg-[#46EE6A] ${
                       activeTime > 0 && activeTime === 600
                         ? "bg-[#46EE6A] text-[#000]"
                         : "text-[#EBEBEB]"
                     }`}
            >
              10 min
            </div>
          </button>
          <button onClick={() => handleSetTime(900)}>
            <div
              className={`flex justify-center bg-[#313131] p-2 rounded-[20px] w-24 gap-1 cursor-pointer hover:opacity-75
                     active:bg-[#46EE6A] ${
                       activeTime > 0 && activeTime === 900
                         ? "bg-[#46EE6A] text-[#000]"
                         : "text-[#EBEBEB]"
                     }`}
            >
              15 min
            </div>
          </button>
          <button onClick={() => handleSetTime(1200)}>
            <div
              className={`flex justify-center bg-[#313131] p-2 rounded-[20px] w-24 gap-1 cursor-pointer hover:opacity-75
                     active:bg-[#46EE6A] ${
                       activeTime > 0 && activeTime === 1200
                         ? "bg-[#46EE6A] text-[#000]"
                         : "text-[#EBEBEB]"
                     }`}
            >
              20 min
            </div>
          </button>
        </div>
        <div className="flex items-center mt-8">
          {" "}
          <div className="flex justify-between rounded-[40px] bg-[#313131] w-60">
            {" "}
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
