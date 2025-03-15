import { useState, useEffect } from "react";

const CountdownTimer = () => {
  // 🔹 FIXED Expiry Date (YYYY, MM (0-based), DD, HH, MM, SS)
  const expiryDate = new Date(2025, 2, 20, 23, 59, 59).getTime(); // 20 March 2025, 11:59:59 PM

  const [timeLeft, setTimeLeft] = useState(expiryDate - new Date().getTime());

  useEffect(() => {
    const timer = setInterval(() => {
      const remainingTime = expiryDate - new Date().getTime();
      setTimeLeft(remainingTime);

      if (remainingTime <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  // Convert milliseconds to days, hours, minutes, seconds
  const formatTime = (time) => {
    if (time <= 0) return "Deal Expired";

    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return `(${days}d ${hours}h ${minutes}m ${seconds}s left)`;
  };

  return (
    <div className=" p-4 rounded-lg text-xl font-bold">
      {formatTime(timeLeft)}
    </div>
  );
};

export default CountdownTimer;
