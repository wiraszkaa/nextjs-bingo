import { useState, useEffect } from "react";
import { database } from "../../pages/api/firebase";
import { ref, onValue } from "firebase/database";
import styles from "./Ranking.module.css";

const Ranking = () => {
  const [ranking, setRanking] = useState(new Map());

  useEffect(() => {
    const rankingRef = ref(database, `bingo/wins`);
    return onValue(rankingRef, (snapshot) => {
      const data = snapshot.val();
      const ranking = new Map();
      if (!data) {
        setRanking([]);
        return;
      }
      const map = new Map();
      map.set(0, 10).set(1, 5).set(2, 2);
      for (const id in data) {
        const game = data[id];
        for (let i = 0; i < game.length; i++) {
          let points;
          if (map.has(i)) {
            points = map.get(i);
          } else {
            points = 1;
          }
          if (!ranking.has(game[i])) {
            ranking.set(game[i], points);
          } else {
            ranking.set(game[i], ranking.get(game[i]) + points);
          }
        }
      }
      setRanking(ranking);
    });
  }, []);

  let content = [];
  for (let [key, value] of ranking) {
    content.push(
      <li key={key}>
        <h2>{`${key}: ${value}`}</h2>
      </li>
    );
  }

  return (
    <div className={styles.ranking}>
      <h1>Ranking</h1>
      <ul>
        {content}
      </ul>
    </div>
  );
};

export default Ranking;
