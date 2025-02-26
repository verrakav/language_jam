// hooks
import {useEffect, useState} from "react";
// context
import {useWordsContext} from "../../context/WordsContext";
// types
import {TypeWord} from "../../Types";
//components
import WordCard from "../WordCard";

export default function DictoinaryPage() {
  const {words} = useWordsContext();

  const [search, setSearch] = useState("");
  const [selectedWord, setSelectedWord] = useState<TypeWord | null>(null);

  useEffect(() => {
    // picks a random word
    if (words.length > 0) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setSelectedWord(randomWord);
    }
  }, [words]);
  // searching functionality
  const filteredWords = words.filter(
    word =>
      word.word.toLowerCase().includes(search.toLowerCase()) ||
      word.translation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex gap-6 h-screen">
      {/* LET side */}
      <div className="w-1/3 flex flex-col">
        <input
          className="p-2 border border-gray-300 rounded mb-2"
          type="text"
          placeholder="search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="overflow-y-auto h-full border border-gray-300 rounded p-2">
          {filteredWords.map(word => (
            <p
              key={word.id}
              className="p-2 cursor-pointer border-b hover:bg-gray-200 rounded text-lg mb-2"
              onClick={() => setSelectedWord(word)}>
              {word.word} - {word.translation}
            </p>
          ))}
        </div>
      </div>
      {/* RIGHT side */}
      <div className="w-2/3 flex justify-center items-center">
        {selectedWord && <WordCard word={selectedWord} />}
      </div>
    </div>
  );
}
