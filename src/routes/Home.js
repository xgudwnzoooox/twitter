import Nweet from "components/Nweet";
import { dbService, storageService } from "fbase";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Home = ({userObj}) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");
  const fileInput = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      //storage 참조 경로로 파일 업로드 하기
      const uploadFile = await uploadString(fileRef, attachment, "data_url");
      console.log(uploadFile);
      //storage에 있는 파일 URL로 다운로드 받기
      attachmentUrl = await getDownloadURL(uploadFile.ref);
    }

    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId : userObj.uid,
      attachmentUrl,
    };
    
    await addDoc(collection(dbService, "nweets"), nweetObj);
    setAttachment("");
    setNweet("");
  };

  const onChange = ({ target: { value } }) => {
    setNweet(value);
  };

  useEffect(() => {
    const q = query(collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNweets(nweetArr);
    });
  }, []);

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = (event) => {
    setAttachment("");
    fileInput.current.value = "";
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} ref = {fileInput} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
          key={nweet.id}
          nweetObj={nweet}
          isOwner={nweet.creatorId === userObj.uid}
        />
        ))}
      </div>
    </div>
  );
};
export default Home;
