'use client';
import './styles.css';
import * as React from 'react'; 
export default function page(){
  React.useEffect(() => {
      document.body.classList.add("wait-body");

      return () => {
        document.body.classList.remove("wait-body");
      };
    }, []);
  React.useEffect(() => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    const randomChar = () => chars[Math.floor(Math.random() * chars.length)];
    const randomString = length => Array.from({ length }, randomChar).join("");

    const card = document.querySelector(".card");
    const letters = card?.querySelector(".card-letters");

    if (!card || !letters) return;

    const handleOnMove = e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      letters.style.setProperty("--x", `${x}px`);
      letters.style.setProperty("--y", `${y}px`);

      letters.innerText = randomString(1500);
    };

    const handleTouchMove = e => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handleOnMove(touch);
      }
    };

    card.addEventListener("mousemove", handleOnMove);
    card.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      card.removeEventListener("mousemove", handleOnMove);
      card.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <>
      <div className="card-track">
        <div className="card-wrapper">
          <div className="card">
            <div className="card-image">
              <div className="flex flex-col items-center gap-2">
                <p className='text-white font-[Lemon_Milk] text-lg'>Loading</p>
                <div className="spinner-container">
                  <div className="spinner"></div>
                  <div className="spinner-inner"></div>
                </div>
              </div>
            </div>
            <div className="card-gradient"></div>
            <div className="card-letters"></div>
          </div>
          <div className="card-corners">
            <span className="card-corner"></span>
            <span className="card-corner"></span>
            <span className="card-corner"></span>
            <span className="card-corner"></span>
          </div>
        </div>
      </div>
    </>
    )
  ;
};