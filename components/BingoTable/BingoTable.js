import styles from "./BingoTable.module.css";
import Cell from "./Cell";

const BingoTable = (props) => {
    if (props.keywords.length === 0) {
        return <div>Loading...</div>
    }

  const table = [];
  let row = 1;
  for (let i = 0; i < 25; i++) {
    let keyword = props.keywords[i];
    let column = (i % 5) + 1;
    table.push(<Cell key={i} keyword={{...keyword, column, row}} />);
    if (column === 5) {
      row++;
    }
  }

  return <div className={styles.table}>{table}</div>;
};

export default BingoTable;
