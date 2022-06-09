import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "./DeleteNote.css";

function DeleteNote() {
  const [noteContent, setNoteContent] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  axios({
    method: "GET",
    url: `${process.env.REACT_APP_NOTER_SERVER}/notes/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      setNoteContent(res.data.content);
    })
    .catch((error) => {
      console.log(error.message);
    });

  const handleYesDeleteOption = async () => {
    await axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_NOTER_SERVER}/notes/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(navigate("/dashboard"))
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleNoDeleteOption = () => {
    navigate("/dashboard");
  };

  return (
    <div className="DeleteNote">
      <h2 className="DeleteQuestion">
        Are you sure you want to delete this note?
      </h2>
      <div className="DeleteNoteContent">{noteContent}</div>
      <div className="DeleteButtons">
        <button
          onClick={handleNoDeleteOption}
          className="NoDeleteOptionButton DeleteButton"
        >
          No
        </button>
        <button
          onClick={handleYesDeleteOption}
          className="YesDeleteOptionButton DeleteButton"
        >
          Yes
        </button>
      </div>
    </div>
  );
}

export default DeleteNote;
