import { useContext, useRef } from "react";
import styles from "./Login.module.css";
import Bingo from "../../store/bingo";

const Login = () => {
  const nameInputRef = useRef();
  const surnameInputRef = useRef();
  const bingoCtx = useContext(Bingo);

  const loginHandler = () => {
    const enteredName = nameInputRef.current.value;
    const enteredSurname = surnameInputRef.current.value;
    if (enteredName.length > 0 && enteredSurname.length > 0) {
      const user = `${enteredName} ${enteredSurname}`;
      bingoCtx.setName(user);
      localStorage.setItem("name", user);
    }
  };

  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <span>Name</span>
      <input ref={nameInputRef} type="text" />
      <span>Surname</span>
      <input ref={surnameInputRef} type="text" />
      <button onClick={loginHandler}>Login</button>
    </div>
  );
};

export default Login;
