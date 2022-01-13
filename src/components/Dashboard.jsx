import React, { useEffect, useState } from "react";
import Header from "./Header";
import ImageGrid from "./ImageGrid";
import Modal from "./Modal";
import Title from "./Title";
import UploadForm from "./UploadForm";

import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";
import { auth, projectFirestore, logout } from "../firebase/config";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const query = await projectFirestore
        .collection("users")
        .where("uid", "==", user?.uid)
        .get();
      const data = await query.docs[0].data();
      setName(data.name);
      setImg(data.img);
    } catch (err) {
      console.log(err);
      toast.error("An error occured while fetching user data");
    }
  };

  const [selectedImg, setSelectedImg] = useState(null);
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");

    fetchUserName();
  }, [user, loading]);

  return (
    <div className="App">
      {loading ? (
        <h3> Loading . . . </h3>
      ) : (
        <>
          <Header logout={logout} name={name} img={img} />
          <Title />
          <UploadForm />
          <ImageGrid setSelectedImg={setSelectedImg} />
          {selectedImg && (
            <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
