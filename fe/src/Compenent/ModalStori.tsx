import React from "react";
import { Stori } from "../Pages/Profile";

interface ModalStoriProps {
  editStori: Partial<Stori>;
  setEditStori: (stori: Partial<Stori>) => void;
  handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isEditMode: boolean;
  handleDelete: () => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

export default function ModalStori({
  editStori,
  setEditStori,
  handleFormSubmit,
  isEditMode,
  handleDelete,
  setIsModalOpen,
}: ModalStoriProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl relative" style={{ height: '80vh', width: '60vw' }}>
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-500 text-2xl"
          onClick={() => setIsModalOpen(false)}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-6">{isEditMode ? "Edit Story" : "Add Story"}</h2>
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(80vh - 150px)' }}>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={editStori.tittle || ""}
                onChange={(e) => setEditStori({ ...editStori, tittle: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                value={editStori.isiCerita || ""}
                onChange={(e) => setEditStori({ ...editStori, isiCerita: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Cover</label>
              <textarea
                value={editStori.cover || ""}
                onChange={(e) => setEditStori({ ...editStori, cover: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Publication Date</label>
              <input
                type="date"
                value={editStori.tglPublis ? new Date(editStori.tglPublis).toISOString().split("T")[0] : ""}
                onChange={(e) => setEditStori({ ...editStori, tglPublis: new Date(e.target.value) })}
                className="w-full px-4 py-3 border rounded-lg"
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg"
              >
                {isEditMode ? "Update" : "Add"}
              </button>
              {isEditMode && (
                <button
                  type="button"
                  className="bg-red-500 text-white px-6 py-3 rounded-lg"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
