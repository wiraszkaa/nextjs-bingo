import { useEffect, useState } from "react";
import { database } from "../../pages/api/firebase";
import { ref, get } from "firebase/database";
import CountdownTimer from "./CountdownTimer/CountdownTimer";

const Start = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const dbRef = ref(database, "bingo/time");
    get(dbRef).then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTime(data);
      }
    });
  }, []);

  if (time === 0) {
    return <div className="centered">Loading...</div>;
  }

  return (
    <div className="centered">
      <h1>Start</h1>
      <CountdownTimer targetDate={time} />
    </div>
  );
};

export default Start;
