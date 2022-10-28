import "../styles/globals.css";
import { BingoProvider } from "../store/bingo";

function MyApp({ Component, pageProps }) {
  return (
    <BingoProvider>
      <Component {...pageProps} />
    </BingoProvider>
  );
}

export default MyApp;
