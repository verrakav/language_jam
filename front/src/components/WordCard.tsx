import Button from "./Button";
import {TypeWord} from "../Types";

export default function WordCard({word}: {word: TypeWord}) {
  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-lg w-96 bg-white">
      <img
        src={`/pictures/${word.picture}.jpeg`}
        alt={word.word}
        className=" object-full rounded"
      />
      <h1>{word.category}</h1>
      <h2 className="text-xl font-semibold mt-2">{word.word}</h2>
      <p className="text-gray-500 italic">{word.translation}</p>
      <p className="mt-2">{word.example}</p>
      <Button audioName={word.pronunciation}>speaker</Button>
    </div>
  );
}
