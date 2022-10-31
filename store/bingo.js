import React, { useEffect, useState } from "react";
import { database } from "../pages/api/firebase";
import { ref, get } from "firebase/database";
import { sendWin } from "../pages/api/firebase";

const Bingo = React.createContext({
  name: null,
  selected: [[], [], [], [], []],
  win: false,
  currentGame: null,
  select: (cell) => {},
  setName: (name) => {},
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
  const [currentGame, setCurrentGame] = useState(null);
  const [win, setWin] = useState(false);
  const [name, setName] = useState(null);
  const selected = initializeSelected();

  useEffect(() => {
    const dbRef = ref(database, "bingo/games");
    get(dbRef).then((snapshot) => {
      const data = snapshot.val();
      setCurrentGame(data.current);
    });
    const name = localStorage.getItem("name");
    if (name) {
        setName(name);
    }
  }, []);

  const selectHandler = (cell) => {
    selected[cell.row - 1][cell.column - 1] = true;
    if (checkSelected(selected)) {
      setWin(true);
      sendWin(name, currentGame);
    }
  };

  const setNameHandler = (name) => {
    setName(name);
  };

  const context = {
    selected,
    select: selectHandler,
    win,
    name,
    currentGame,
    setName: setNameHandler,
  };

  return <Bingo.Provider value={context}>{props.children}</Bingo.Provider>;
}

export default Bingo;
