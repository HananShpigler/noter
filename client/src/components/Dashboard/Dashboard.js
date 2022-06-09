import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";

import "./Dashboard.css";

function Dashboard() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = () => {
    const token = localStorage.getItem("token");

    axios
      .get(`${process.env.REACT_APP_NOTER_SERVER}/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setNotes(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [setNotes]);

  return (
    <div className="Dashboard">
      <h1 className="DashboardNotes">Notes</h1>
      <Link to="/create">
        <button className="AddButton">+</button>
      </Link>

      {!notes ||
        (notes.length === 0 && (
          <h2 className="NoNotesFound">No Notes Found</h2>
        ))}
      <div className="NoteList">
        {notes && (
          <div>
            {notes &&
              notes.map((note) => (
                <div className="Note" key={note._id}>
                  <div className="NoteContent">{note.content}</div>
                  <Link to={`/delete/${note._id}`}>
                    <span className="DeleteIcon">
                      <DeleteIcon />
                    </span>
                  </Link>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
