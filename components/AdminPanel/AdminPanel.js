import { useEffect, useState } from "react";
import styles from "./AdminPanel.module.css";
import { database } from "../../pages/api/firebase";
import { onValue, ref } from "firebase/database";
import KeywordItem from "./KeywordItem";

const AdminPanel = () => {
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    const answersRef = ref(database, "bingo/chat/validations");
    return onValue(answersRef, (snapshot) => {
      const data = snapshot.val();
      const keywords = [];
      if (!data) {
        setKeywords([]);
        return;
      }
      for (const id in data) {
        keywords.push({...data[id]})
      }
      setKeywords(keywords);
    });
  }, []);

  let content = keywords.map((keyword, index) => (
    <KeywordItem key={index} keyword={keyword} />
  ));

  return (
    <div className={styles.panel}>
      <h1>Admin Panel</h1>
      {content}
    </div>
  );
};

export default AdminPanel;
