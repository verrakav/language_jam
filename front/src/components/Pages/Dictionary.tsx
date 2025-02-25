import {useState, useEffect} from "react";
// types
import {TypeWord} from "../../Types";
//components
import WordCard from "../WordCard";

// TODO: type for the WORD
export default function Dictoinary() {
  // setting state, move somewhere later?
  const [words, setWords] = useState<TypeWord[]>([]);
  const [search, setSearch] = useState("");
  const [selectedWord, setSelectedWord] = useState<TypeWord | null>(null);

  // effect to fetch ALL WORDS
  useEffect(() => {
    fetch("http://localhost:8080/words")
      .then(res => res.json())
      .then(data => {
        // console.log("Fetched data: ", data);
        setWords(data);
        // picks a random word
        setSelectedWord(data[Math.floor(Math.random() * data.length)]);
      })
      .catch(err =>
        console.error("Failed to fetch at the words at the front: ", err)
      );
  }, []);
  // console.log(words);
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
