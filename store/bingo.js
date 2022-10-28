import React, { useState } from "react";

const Bingo = React.createContext({
  selected: [[], [], [], [], []],
  win: false,
  select: (cell) => {},
});

const initializeSelected = () => {
  let selected = [[], [], [], [], []];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      selected[i][j] = false;
    }
  }
  return selected;
};

const checkRow = (selected, row) => {
  for (let i = 0; i < 5; i++) {
    if (!selected[row][i]) {
      return false;
    }
  }
  return true;
};

const checkColumn = (selected, column) => {
  for (let i = 0; i < 5; i++) {
    if (!selected[i][column]) {
      return false;
    }
  }
  return true;
};

const checkDiagonal = (selected) => {
  for (let i = 0; i < 5; i++) {
    if (!selected[i][i]) {
      return false;
    }
  }
  return true;
};

const checkReverseDiagonal = (selected) => {
  for (let i = 0; i < 5; i++) {
    if (!selected[i][4 - i]) {
      return false;
    }
  }
  return true;
};

const checkSelected = (selected) => {
  for (let i = 0; i < 5; i++) {
    if (checkRow(selected, i) || checkColumn(selected, i)) {
      return true;
    }
  }
  if (checkDiagonal(selected) || checkReverseDiagonal(selected)) {
    return true;
  }
  return false;
};

export function BingoProvider(props) {
  const [win, setWin] = useState(false);
  const selected = initializeSelected();

  const select = (cell) => {
    selected[cell.row - 1][cell.column - 1] = true;
    if (checkSelected(selected)) {
      setWin(true);
    }
  };

  const context = {
    selected,
    select,
    win,
  };

  return <Bingo.Provider value={context}>{props.children}</Bingo.Provider>;
}

export default Bingo;
