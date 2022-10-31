import Head from "next/head";
import { useEffect, useState, useContext } from "react";
import AdminPanel from "../components/AdminPanel/AdminPanel";
import BingoTable from "../components/BingoTable/BingoTable";
import Chat from "../components/Chat/Chat";
import Login from "../components/Login/Login";
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
        <p>Beta v0.1</p>
        {bingoCtx.win && <div className="win">You win!</div>}
        {!bingoCtx.name && <Login />}
        {bingoCtx.name && (
          <div className="flex">
            <BingoTable keywords={keywords} />
            <Chat />
          </div>
        )}
        {bingoCtx.name === "Jakub_Wiraszka_ADMIN" && <AdminPanel />}
      </main>
    </>
  );
}
