import Link from "next/link";
import { Button } from "./ui/button";

type CardPresenterProps = {
  name: string;
  photoUrl: string;
  isSelected: boolean;
  linkUrl: string;
  onClick: () => void;
};

export function CardPresenter({
  name,
  photoUrl,
  isSelected,
  linkUrl,
  onClick,
}: CardPresenterProps) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer border z-50 rounded-lg p-4 ${
        isSelected ? 'bg-green-200' : 'bg-white'
      }`}
    >
      <img src={photoUrl} alt={name} className="w-full z-50 h-32 object-contain mb-2" />
      <h3 className="text-lg font-semibold">{name}</h3>
      <Button>
        <Link href={linkUrl} target="_blank" >Comprar</Link>
      </Button>
    </div>
  );
}
