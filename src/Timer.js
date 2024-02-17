import { useState, useEffect } from "react";

const App = () => {
  const [comments, setComments] = useState([]);

  const addComment = () => {
    setComments([...comments, { time: { hours: 0, minutes: 0, seconds: 0 }, comment: "" }]);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newComments = comments.map((comment, i) => {
      if (i === index) {
        comment.time[name] = parseInt(value);
      }
      return comment;
    });
    setComments(newComments);
  };

  const startTimer = (index) => {
    const newComments = comments.map((comment, i) => {
      if (i === index) {
        comment.timer = setInterval(() => {
          if (comment.time.seconds > 0) {
            comment.time.seconds -= 1;
          } else if (comment.time.minutes > 0) {
            comment.time.minutes -= 1;
            comment.time.seconds = 59;
          } else if (comment.time.hours > 0) {
            comment.time.hours -= 1;
            comment.time.minutes = 59;
            comment.time.seconds = 59;
          } else {
            clearInterval(comment.timer);
          }
          return comment;
        }, 1000);
      }
      return comment;
    });
    setComments(newComments);
  };

  const stopTimer = (index) => {
    const newComments = comments.map((comment, i) => {
      if (i === index) {
        clearInterval(comment.timer);
      }
      return comment;
    });
    setComments(newComments);
  };

  const resetTimer = (index) => {
    const newComments = comments.filter((comment, i) => i !== index);
    setComments(newComments);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newComments = comments.map((comment) => {
        if (comment.timer) {
          if (comment.time.seconds > 0) {
            comment.time.seconds -= 1;
          } else if (comment.time.minutes > 0) {
            comment.time.minutes -= 1;
            comment.time.seconds = 59;
          } else if (comment.time.hours > 0) {
            comment.time.hours -= 1;
            comment.time.minutes = 59;
            comment.time.seconds = 59;
          } else {
            clearInterval(comment.timer);
          }
        }
        return comment;
      });
      setComments(newComments);
    }, 1000);

    return () => clearInterval(interval);
  }, [comments]);

  return (
    <div>
      <button onClick={addComment}>Добавить Таймер</button>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            <h1>
              {comment.time.hours}:{comment.time.minutes}:{comment.time.seconds}
            </h1>
            <form>
              <label htmlFor="hours">Hours:</label>
              <input type="number" name="hours" value={comment.time.hours} min={0} max={999} step={1} onChange={(e) => handleChange(e, index)} />
              <label htmlFor="minutes">Minutes:</label>
              <input type="number" name="minutes" value={comment.time.minutes} min={0} max={59} step={1} onChange={(e) => handleChange(e, index)} />
              <label htmlFor="seconds">Seconds:</label>
              <input type="number" name="seconds" value={comment.time.seconds} min={0} max={59} step={1} onChange={(e) => handleChange(e, index)} />
            </form>
            <button onClick={() => startTimer(index)}>Start</button>
            <button onClick={() => stopTimer(index)}>Stop</button>
            <button onClick={() => resetTimer(index)}>Reset</button>
            <br />
            <textarea
              value={comment.comment}
              onChange={(e) => {
                const newComments = comments.map((comment, i) => {
                  if (i === index) {
                    comment.comment = e.target.value;
                  }
                  return comment;
                });
                setComments(newComments);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
