import Head from "next/head";
import { useEffect, useState, useContext } from "react";
import BingoTable from "../components/BingoTable/BingoTable";
import Bingo from "../store/bingo";
import { getBingoTable } from "./api/bingo";

export default function Home() {
  const bingoCtx = useContext(Bingo);
  const [keywords, setKeywords] = useState([]);
  useEffect(() => {
    setKeywords(getBingoTable());
  }, []);

  return (
    <>
      <Head>
        <title>Ireneusz Jóźwiak Bingo</title>
        <meta name="description" content="Świetna gra" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <h1>Jóźwiak Bingo</h1>
        <p>Alpha v0.1</p>
        {bingoCtx.win && <div className="win">You win!</div>}
        <BingoTable keywords={keywords} />
      </main>
    </>
  );
}
