// hooks
import {useWordsContext} from "../../context/WordsContext";
// components

export default function StudyPage() {
  const {categories} = useWordsContext();

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Choose a Category</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-4xl">
        {categories.map(category => (
          <CategoryCard key={category.name} category={category} />
        ))}
      </div>
    </div>
  );
}

function CategoryCard({category}: {category: string}) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 text-center cursor-pointer hover:shadow-xl transition">
      <h2 className="text-xl font-semibold">{category.name}</h2>
      <p>{category.translation}</p>
      <img src={`/pictures/${category}`} />
    </div>
  );
}
