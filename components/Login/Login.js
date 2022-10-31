import { useContext, useRef } from "react";
import styles from "./Login.module.css";
import Bingo from "../../store/bingo";

const Login = () => {
  const nameInputRef = useRef();
  const bingoCtx = useContext(Bingo);

  const loginHandler = () => {
    const enteredName = nameInputRef.current.value;
    if (enteredName) {
      const user = enteredName.split(" ").join("_");
      bingoCtx.setName(user);
      localStorage.setItem("name", user);
    }
  };

  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <input ref={nameInputRef} type="text" />
      <button onClick={loginHandler}>Login</button>
    </div>
  );
};

export default Login;
