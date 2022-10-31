import Head from "next/head";
import { useContext } from "react";
import AdminPanel from "../components/AdminPanel/AdminPanel";
import BingoTable from "../components/BingoTable/BingoTable";
import Chat from "../components/Chat/Chat";
import Login from "../components/Login/Login";
import Start from "../components/Start/Start";
import Bingo from "../store/bingo";

export default function Home() {
  const bingoCtx = useContext(Bingo);

  return (
    <>
      <Head>
        <title>Ireneusz Jóźwiak Bingo</title>
        <meta name="description" content="Świetna gra" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <h1>Jóźwiak Bingo</h1>
        <p>Alpha v1.0</p>
        {bingoCtx.win && <div className="win">You win!</div>}
        {!bingoCtx.name && <Login />}
        {bingoCtx.name && bingoCtx.currentGame < 0 && <Start />}
        {bingoCtx.name && bingoCtx.currentGame >= 0 && (
          <div className="flex">
            <BingoTable keywords={bingoCtx.keywords} />
            <Chat />
          </div>
        )}
        {bingoCtx.name === process.env.NEXT_PUBLIC_ADMIN && <AdminPanel />}
      </main>
    </>
  );
}
