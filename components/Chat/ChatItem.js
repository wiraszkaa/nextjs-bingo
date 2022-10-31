import styles from "./Chat.module.css";

const ChatItem = (props) => {
    return <li className={styles.message}>
        <h2>{props.message.author}</h2>
        <p>{props.message.text}</p>
    </li>;
}

export default ChatItem;