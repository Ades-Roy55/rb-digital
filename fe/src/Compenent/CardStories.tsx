import { Stori } from "../Pages/Profile";

interface CardStoriesProps {
  stori: Stori;
  openModal: () => void;
}

export default function CardStories({ stori, openModal }: CardStoriesProps) {
  return (
    <div className="cursor-pointer" onClick={openModal}>
      <img src={stori.cover} alt={stori.tittle} className="w-full h-64 object-cover rounded-lg" />
      <h2 className="text-xl font-semibold mt-2">{stori.tittle}</h2>
    </div>
  );
}
