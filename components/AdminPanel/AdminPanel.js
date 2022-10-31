import { useEffect, useState } from "react";
import { KEYWORDS } from "../../pages/api/bingo";
import { database } from "../../pages/api/firebase";
import { onValue, ref } from "firebase/database";

const AdminPanel = () => {
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    const answersRef = ref(database, "bingo/answers");
    return onValue(answersRef, (snapshot) => {
      const data = snapshot.val();
      const keywords = [];
      for (const key in data) {
        let valid = 0;
        let invalid = 0;
        for (const answer in data[key]) {
          if (data[key][answer]) {
            valid++;
          } else {
            invalid++;
          }
        }
        keywords.push({
          id: key,
          valid,
          invalid,
        });
      }
      setKeywords(keywords);
    });
  }, []);

  let content = keywords.map((keyword) => (
    <div>
      <h1>{keyword.id}</h1>
      <p>Valid: {keyword.valid}</p>
      <p>Invalid: {keyword.invalid}</p>
    </div>
  ));

  return (
    <div>
      <h1>Admin Panel</h1>
      {content}
    </div>
  );
};

export default AdminPanel;
