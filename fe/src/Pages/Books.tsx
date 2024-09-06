import { useEffect, useState } from "react";
import { Koleksi } from "./Collection";
import Cookies from "js-cookie";

export interface Book {
  id: number;
  tittle: string;
  penulis: string;
  sinopsis: string;
  genre: string;
  isiCerita: string;
  cover: string;
}

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showFullStory, setShowFullStory] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [koleksi, setKoleksi] = useState<Koleksi[]>([]);
  const [newBookId, setNewBookId] = useState<number | null>(null);

  const autorhiz: RequestInit = {
    method: "DELETE",
    credentials: "include",
    headers: {
      Authorization: ("Bearer " + Cookies.get("token")) as string,
    },
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/buku", autorhiz)
      .then((response) => response.json())
      .then((books) => {
        setBooks(books);
        setFilteredBooks(books);
      })
      .catch((error) => console.error("Error fetching books", error));
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterAndSortBooks(term, sortOrder);
  };

  const handleSortToggle = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    filterAndSortBooks(searchTerm, newSortOrder);
  };

  const filterAndSortBooks = (term: string, order: "asc" | "desc") => {
    const filtered = books
      .filter((book) => book.tittle.toLowerCase().includes(term.toLowerCase()))
      .sort((a, b) => {
        if (order === "asc") {
          return a.tittle.localeCompare(b.tittle);
        } else {
          return b.tittle.localeCompare(a.tittle);
        }
      });
    setFilteredBooks(filtered);
  };

  const handleImageClick = (book: Book) => {
    setSelectedBook(book);
    setShowFullStory(false); // Reset story visibility
  };

  const handleClosePopup = () => {
    setSelectedBook(null);
  };

  const handleToggleStory = () => {
    setShowFullStory(!showFullStory);
  };

  const addKoleksi = (books: Book) => {
    // if (newBookId === null) {
    // alert("Please enter a valid book ID.");
    fetch("http://localhost:8080/api/koleksi/" + books.id, {
      method: "POST",
    }).then((res) => console.log(res));
    return;
    // }

    return;
    const newKoleksi = {
      id_buku: newBookId,
    };

    fetch("http://localhost:8080/api/koleksi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newKoleksi),
    })
      .then((response) => response.json())
      .then((addedKoleksi) => {
        setKoleksi([...koleksi, addedKoleksi]);
        setNewBookId(null);
        alert("Koleksi added successfully!");
      })
      .catch((error) => console.error("Error adding koleksi", error));
  };
  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-6">RB-Collection</h1>

      <div className="flex justify-center mb-6 space-x-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by title..."
          className="p-2 border border-gray-300 rounded w-full max-w-md"
        />
        <button
          onClick={handleSortToggle}
          className="p-2 bg-gray-600 text-gray-50-700 rounded"
        >
          Sort {sortOrder === "asc" ? "Descending" : "Ascending"}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredBooks.map((book) => (
          <div key={book.id} className="flex flex-col items-center">
            <img
              src={book.cover}
              alt={book.tittle}
              className="w-32 h-64 object-cover mb-2 cursor-pointer"
              onClick={() => handleImageClick(book)}
            />
            <h2 className="text-xl font-semibold mb-1 text-center truncate max-w-32">
              {book.tittle}
            </h2>
          </div>
        ))}
      </div>

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
                src={selectedBook.cover}
                alt={selectedBook.tittle}
                className="w-1/3 h-auto object-cover mr-4"
              />
              <div className="flex flex-col w-2/3">
                <h2 className="text-3xl font-semibold mb-4">
                  {selectedBook.tittle}
                </h2>
                <p className="text-gray-700 mb-2">
                  Penulis: {selectedBook.penulis}
                </p>
                <p className="text-gray-600 mb-2">
                  Genre: {selectedBook.genre}
                </p>
                {!showFullStory ? (
                  <>
                    <p className="text-gray-800 mb-4">
                      Sinopsis: {selectedBook.sinopsis}
                    </p>
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
                      <p className="text-gray-800">{selectedBook.isiCerita}</p>
                    </div>
                  </>
                )}
                {/* Add Save button here */}
                <button
                  onClick={() => addKoleksi(selectedBook)}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
