import { useEffect, useState } from "react";

export interface Koleksi {
  id: number;
  buku: {
    id: number;
    cover: string;
    tittle: string;
    genre: string;
    sinopsis: string;
    penulis: string;
    isiCerita: string;
  };
}

export default function Collection() {
  const [koleksi, setKoleksi] = useState<Koleksi[]>([]);
  const [selectedBook, setSelectedBook] = useState<Koleksi | null>(null);
  const [showFullStory, setShowFullStory] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/koleksi")
      .then((response) => response.json())
      .then((koleksi) => {
        setKoleksi(koleksi);
      })
      .catch((error) => console.error("Error fetching koleksi", error));
  }, []);

  const handleImageClick = (book: Koleksi) => {
    setSelectedBook(book);
    setShowFullStory(false);
  };

  const handleClosePopup = () => {
    setSelectedBook(null);
  };

  const handleToggleStory = () => {
    setShowFullStory(!showFullStory);
  };

  const handleDeleteBook = (id: number) => {
    console.log(selectedBook);
    fetch(`http://localhost:8080/api/koleksi/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          const updatedKoleksi = koleksi.filter((item) => item.buku.id !== id);
          setKoleksi(updatedKoleksi);
          setSelectedBook(null); // Menutup popup setelah penghapusan
        } else {
          console.error("Failed to delete book from database");
        }
        window.location.reload();
      })
      .catch((error) => console.error("Error deleting book", error));
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-6">Your Collection</h1>

      {koleksi.length === 0 ? (
        <p className="text-center">No collections found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {koleksi.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              <img
                src={item.buku?.cover}
                alt={item.buku?.tittle}
                className="w-32 h-64 object-cover mb-2 cursor-pointer"
                onClick={() => handleImageClick(item)}
              />
              <h2 className="text-xl font-semibold mb-1 text-center truncate max-w-32">
                {item.buku.tittle}
              </h2>
            </div>
          ))}
        </div>
      )}

      {selectedBook && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>
            <div className="flex">
              <img
                src={selectedBook.buku.cover}
                alt={selectedBook.buku.tittle}
                className="w-1/3 h-auto object-cover mr-4"
              />
              <div className="flex flex-col w-2/3">
                <h2 className="text-3xl font-semibold mb-4">
                  {selectedBook.buku.tittle}
                </h2>
                <p className="text-gray-700 mb-2">Penulis: {selectedBook.buku.penulis}</p>
                <p className="text-gray-600 mb-2">Genre: {selectedBook.buku.genre}</p>
                {!showFullStory ? (
                  <>
                    <p className="text-gray-800 mb-4">Sinopsis: {selectedBook.buku.sinopsis}</p>
                    <button
                      onClick={handleToggleStory}
                      className="text-blue-500 hover:underline self-start"
                    >
                      Selengkapnya
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleToggleStory}
                      className="text-blue-500 hover:underline self-start mb-4"
                    >
                      Kembali
                    </button>
                    <div className="overflow-y-auto h-[60vh]">
                      <p className="text-gray-800">{selectedBook.buku.isiCerita}</p>
                    </div>
                  </>
                )}

                <button
                  onClick={() => handleDeleteBook(selectedBook.id)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                >
                  Batal Menyimpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
