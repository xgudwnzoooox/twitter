import { dbService } from "fbase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "nweets"), {
      nweet,
      createdAt: Date.now(),
    });
    console.log("Document written with ID: ", docRef.id);
    } catch (error) {
    console.error("Error adding document: ", error);
    }

    setNweet("");
  };
  const onChange = ({ target: { value } }) => {
    setNweet(value);
  };

  const getNweets = async () => {
    const q = query(collection(dbService, "nweets")); //query 요청을 만들고
    console.log(q)
    const querySnapshot = await getDocs(q);   //요청을 실행하고 데이터를 서버로부터 querySnapshot 형태로 받아옴
    querySnapshot.forEach((doc) => {
      const nweetObj = {
        ...doc.data(),
        id: doc.id,
        }
      setNweets(prev => [nweetObj, ...prev]);
    });
  };

  useEffect(() => {
    getNweets();
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (   ////////////////////
          <div key={nweet.id}>
            <h4>{nweet.nweet}</h4>
          </div>
        ))}
      </div>
    </>
  );
};
export default Home;
