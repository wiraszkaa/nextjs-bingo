import { useState, useEffect } from "react";
import { database } from "../../pages/api/firebase";
import { ref, onValue } from "firebase/database";
import styles from "./Ranking.module.css";

const Ranking = () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const rankingRef = ref(database, `bingo/wins`);
    return onValue(rankingRef, (snapshot) => {
      const data = snapshot.val();
      const ranking = [];
      if (!data) {
        setRanking([]);
        return;
      }
      for (const id in data) {
        const game = [];
        for (const name in data[id]) {
          game.push(name, (data[id][name].win));
        }
        game.sort((a, b) => b[1] - a[1]);
        ranking.push(game);
      }
      setRanking(ranking);
    });
  }, []);

  return (
    <div className={styles.ranking}>
      <h1>Ranking</h1>
    </div>
  );
};

export default Ranking;
