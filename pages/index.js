import Head from "next/head";
import { useContext } from "react";
import AdminPanel from "../components/AdminPanel/AdminPanel";
import BingoTable from "../components/BingoTable/BingoTable";
import Chat from "../components/Chat/Chat";
import Login from "../components/Login/Login";
import Ranking from "../components/Ranking/Ranking";
import Start from "../components/Start/Start";
import Bingo from "../store/bingo";

export default function Home({ ip }) {
  const bingoCtx = useContext(Bingo);
  bingoCtx.setIp(ip);

  return (
    <>
      <Head>
        <title>Bingo</title>
        <meta name="description" content="Świetna gra" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <h1>Bingo</h1>
        <p>Alpha v2.0</p>
        {bingoCtx.win && (
          <div className="win">
            <h1>You win!</h1>
            <Ranking />
          </div>
        )}
        {!bingoCtx.name && <Login />}
        {bingoCtx.name && bingoCtx.currentGame < 0 && <Start />}
        {bingoCtx.name && bingoCtx.currentGame >= 0 && (
          <div className="flex">
            <BingoTable keywords={bingoCtx.keywords} />
            <Chat />
          </div>
        )}
        {bingoCtx.name === process.env.NEXT_PUBLIC_ADMIN && <AdminPanel />}
        {!bingoCtx.win && <Ranking />}
      </main>
    </>
  );
}

Home.getInitialProps = async ({ req }) => {
  const ip = req.headers["x-real-ip"] || req.connection.remoteAddress;
  return { ip };
};