import React, { useEffect, useState } from "react";
import CardStories from "../Compenent/CardStories";
import ModalStori from "../Compenent/ModalStori";

export interface Stori {
  id: number;
  tittle: string;
  isiCerita: string;
  cover: string;
  tglPublis: Date;
  id_user: number;
}

export default function Profil() {
  const [stories, setStories] = useState<Stori[]>([]);
  const [editStori, setEditStori] = useState<Partial<Stori>>({
    id: 0,
    tittle: "",
    isiCerita: "",
    cover: "",
    tglPublis: new Date(),
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/stori")
      .then((response) => response.json())
      .then((stories) => setStories(stories))
      .catch((error) => console.error("Error fetching stories:", error));
  }, []);

  function handleDelete() {
    if (editStori.id) {
      fetch(`http://localhost:8080/api/stori/${editStori.id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            setStories(stories.filter((stori) => stori.id !== editStori.id));
            resetForm();
          }
        })
        .catch((error) => console.error("Error deleting story:", error));
    }
  }

  function handleEdit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (editStori.id) {
      fetch(`http://localhost:8080/api/stori/${editStori.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editStori),
      })
        .then((response) => response.json())
        .then((stori) => {
          setStories(stories.map((s) => (s.id === stori.id ? stori : s)));
          resetForm();
        })
        .catch((error) => console.error("Error updating story:", error));
    }
  }

  function handleAdd(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch(`http://localhost:8080/api/stori`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editStori),
    })
      .then((response) => response.json())
      .then((newStori) => {
        setStories([...stories, newStori]);
        resetForm();
      })
      .catch((error) => console.error("Error adding story:", error));
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (isEditMode) {
      handleEdit(event);
    } else {
      handleAdd(event);
    }
  }

  function resetForm() {
    setEditStori({
      id: 0,
      tittle: "",
      isiCerita: "",
      cover: "",
      tglPublis: new Date(),
    });
    setIsEditMode(false);
    setIsModalOpen(false);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Story Profile</h1>
      <div className="mb-4 flex justify-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            resetForm();
            setIsEditMode(false);
            setIsModalOpen(true);
          }}
        >
          Add Story
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stories.map((stori) => (
          <CardStories
            key={stori.id}
            stori={stori}
            openModal={() => {
              setEditStori(stori);
              setIsEditMode(true);
              setIsModalOpen(true);
            }}
          />
        ))}
      </div>

      {isModalOpen && (
        <ModalStori
          editStori={editStori}
          setEditStori={setEditStori}
          handleFormSubmit={handleFormSubmit}
          isEditMode={isEditMode}
          handleDelete={handleDelete}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
}
