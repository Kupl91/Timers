import React, { useState, useEffect } from 'react';

function Timer() {
  // Определение состояния для хранения времени таймера и статуса таймера
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  // Обновление состояния каждую секунду и сохранение его в Local Storage
  useEffect(() => {
    let timer = null;

    if (timerOn) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (!timerOn) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [timerOn]);

  // Функции для обработки нажатий на кнопки
  const startTimer = () => setTimerOn(true);
  const stopTimer = () => setTimerOn(false);
  const resetTimer = () => {
    setTimerOn(false);
    setTime(0);
  };

  return (
    <div>
      <h1>{time}</h1>
      <button onClick={startTimer}>Старт</button>
      <button onClick={stopTimer}>Стоп</button>
      <button onClick={resetTimer}>Сброс</button>
    </div>
  );
}

export default Timer;
