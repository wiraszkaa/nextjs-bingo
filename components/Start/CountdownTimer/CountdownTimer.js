import styles from "./CountdownTimer.module.css";
import useCountdown from "../../../hooks/use-countdown";

const CountdownTimer = (props) => {
  const [days, hours, minutes, seconds] = useCountdown(props.targetDate);

  return (
    <div className={styles.counter}>
      <div className={styles.number}>
        <span>{days}</span>
        <p>Days</p>
      </div>
      <div className={styles.break}>
        <span>:</span>
      </div>
      <div className={styles.number}>
        <span>{hours}</span>
        <p>Hours</p>
      </div>
      <div className={styles.break}>
        <span>:</span>
      </div>
      <div className={styles.number}>
        <span>{minutes}</span>
        <p>Minutes</p>
      </div>
      <div className={styles.break}>
        <span>:</span>
      </div>
      <div className={styles.number}>
        <span>{seconds}</span>
        <p>Seconds</p>
      </div>
    </div>
  );
};

export default CountdownTimer;
