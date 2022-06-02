import notes from "../assets/data";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import React, { useEffect, useState } from "react";

function Note() {
  const { id } = useParams();
  //   console.log("id", id);
  let history = useNavigate(); // previous version used it as a history prop
  //   let note = notes.find((note) => note.id == id);
  let [note, setNote] = useState(null);
  useEffect(() => {
    getNote();
  }, [id]);

  let getNote = async () => {
    if (id == "new") return;
    let response = await fetch(`http://127.0.0.1:5000/notes/${id}`);
    let data = await response.json();
    setNote(data);
  };

  const createNote = async () => {
    await fetch(`http://127.0.0.1:5000/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  const updateNote = async () => {
    await fetch(`http://127.0.0.1:5000/notes/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  const deleteNote = async () => {
    await fetch(`http://127.0.0.1:5000/notes/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    history("/");
  };

  let handleSubmit = () => {
    if (id != "new" && !note.body) {
      deleteNote();
    } else if (id != "new") {
      updateNote();
    } else if (id === "new" && note !== null) {
      createNote();
    }

    history("/");
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to={"/"}>
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>
        {id != "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        placeholder="Edit note"
        value={note?.body}
      ></textarea>
    </div>
  );
}

export default Note;
