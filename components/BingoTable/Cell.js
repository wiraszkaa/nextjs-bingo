import { useState, useContext } from "react";
import Bingo from "../../store/bingo";
import styles from "./BingoTable.module.css";

const Cell = (props) => {
    const [selected, setSelected] = useState(false);
    const bingoCtx = useContext(Bingo);

    const selectHandler = () => {
        setSelected(true);
        bingoCtx.select(props.keyword)
    };

  return (
    <button
      style={{
        gridColumn: `${props.keyword.column} / ${props.keyword.column + 1}`,
        gridRow: `${props.keyword.row} / ${props.keyword.row + 1}`,
      }}
      className={`${styles.cell} ${selected ? styles.active : ""}`}
      onClick={selectHandler}
    >
      <span>{props.keyword.keyword}</span>
    </button>
  );
};

export default Cell;
