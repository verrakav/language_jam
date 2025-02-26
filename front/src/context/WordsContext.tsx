import {createContext, useContext, useState, useEffect, ReactNode} from "react";
// types
import {TypeWord} from "../Types";

const WordsContext = createContext<{words: TypeWord[]; categories: string[]}>({
  words: [],
  categories: []
});

export function WordContextProvider({children}: {children: ReactNode}) {
  const [words, setWords] = useState<TypeWord[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  // effect to fetch ALL WORDS
  useEffect(() => {
    fetch("http://localhost:8080/words")
      .then(res => res.json())
      .then(data => {
        // console.log("Fetched data: ", data);
        setWords(data);
      })
      .catch(err =>
        console.error("Failed to fetch at the words at the front: ", err)
      );
  }, []);

  //  gets ALL CATEGORIES
  useEffect(() => {
    fetch("http://localhost:8080/categories").then(res =>
      res.json().then(data => setCategories(data))
    );
  }, []);
  // console.log(words);
  console.log(categories);
  return (
    <WordsContext.Provider value={{words, categories}}>
      {children}
    </WordsContext.Provider>
  );
}

export function useWordsContext() {
  const context = useContext(WordsContext);
  if (!context)
    throw new Error("useWordsContext must be used within a WordContextProvider");
  return context;
}
