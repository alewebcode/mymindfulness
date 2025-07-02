export const TimeButton = ({
  label,
  seconds,
  activeTime,
  onClick,
}: {
  label: string;
  seconds: number;
  activeTime: number;
  onClick: (t: number) => void;
}) => (
  <button
    onClick={() => onClick(seconds)}
    className={`flex justify-center bg-[#313131] p-2 rounded-[20px] w-24 gap-1 cursor-pointer hover:opacity-75
                     active:bg-[#46EE6A] ${
                       activeTime > 0 && activeTime === seconds
                         ? "bg-[#46EE6A] text-[#000]"
                         : "text-[#EBEBEB]"
                     }`}
  >
    {label}
  </button>
);
