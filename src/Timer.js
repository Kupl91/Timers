import { useState, useEffect } from "react";

const App = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const commentsFromLocalStorage = localStorage.getItem("comments");
    if (commentsFromLocalStorage) {
      setComments(JSON.parse(commentsFromLocalStorage).map(comment => ({...comment, time: new Date(comment.time), endTime: new Date(comment.endTime)})));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments.map(comment => ({...comment, time: comment.time.getTime(), endTime: comment.endTime.getTime()}))));
  }, [comments]);

  const addComment = () => {
    const newComment = { time: new Date(0), endTime: new Date(), comment: "", timerOn: false };
    setComments([...comments, newComment]);
  };

  const startTimer = (index) => {
    setComments(prevComments => prevComments.map((comment, i) => {
      if (i === index) {
        const newEndTime = new Date();
        newEndTime.setSeconds(newEndTime.getSeconds() + comment.time.getUTCSeconds());
        newEndTime.setMinutes(newEndTime.getMinutes() + comment.time.getUTCMinutes());
        newEndTime.setHours(newEndTime.getHours() + comment.time.getUTCHours());
        return {...comment, timerOn: true, endTime: newEndTime};
      }
      return comment;
    }));
  };

  const stopTimer = (index) => {
    setComments(prevComments => prevComments.map((comment, i) => {
      if (i === index) {
        return {...comment, timerOn: false};
      }
      return comment;
    }));
  };

  const resetTimer = (index) => {
    setComments(prevComments => prevComments.filter((comment, i) => i !== index));
  };

  const setTime = (index, hours, minutes, seconds) => {
    setComments(prevComments => prevComments.map((comment, i) => {
      if (i === index) {
        const newTime = new Date(0);
        newTime.setUTCHours(hours);
        newTime.setUTCMinutes(minutes);
        newTime.setUTCSeconds(seconds);
        return {...comment, time: newTime};
      }
      return comment;
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setComments(prevComments => prevComments.map((comment) => {
        if (comment.timerOn) {
          const newTime = new Date(comment.time.getTime() - 1000);
          if (newTime.getUTCHours() === 0 && newTime.getUTCMinutes() === 0 && newTime.getUTCSeconds() === 0) {
            alert(`Таймер "${comment.comment}" закончился!`); // Добавляем оповещение с названием таймера
            return {...comment, timerOn: false};
          }
          return {...comment, time: newTime};
        }
        return comment;
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <button onClick={addComment}>Добавить Таймер</button>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            <form>
              <label htmlFor="hours">Hours:</label>
              <input type="number" name="hours" value={comment.time.getUTCHours()} min={0} max={999} step={1} onChange={(e) => setTime(index, e.target.value, comment.time.getUTCMinutes(), comment.time.getUTCSeconds())} />
              <label htmlFor="minutes">Minutes:</label>
              <input type="number" name="minutes" value={comment.time.getUTCMinutes()} min={0} max={59} step={1} onChange={(e) => setTime(index, comment.time.getUTCHours(), e.target.value, comment.time.getUTCSeconds())} />
              <label htmlFor="seconds">Seconds:</label>
              <input type="number" name="seconds" value={comment.time.getUTCSeconds()} min={0} max={59} step={1} onChange={(e) => setTime(index, comment.time.getUTCHours(), comment.time.getUTCMinutes(), e.target.value)} />
            </form>
            <button onClick={() => startTimer(index)}>Start</button>
            <button onClick={() => stopTimer(index)}>Stop</button>
            <button onClick={() => resetTimer(index)}>Reset</button>
            <br />
            <textarea
              value={comment.comment}
              onChange={(e) => {
                setComments(prevComments => prevComments.map((comment, i) => {
                  if (i === index) {
                    return {...comment, comment: e.target.value};
                  }
                  return comment;
                }));
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
