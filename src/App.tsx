import { useEffect, useState } from "react";
import Form from "./components/Form";
import { IToDoItem } from "./components/Item";
import ItemList from "./components/ItemList";

function App() {
  const [list, setList] = useState<IToDoItem[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((res) => res.json())
      .then((data) => setList(data));
  }, []);

  return (
    <div className="flex flex-col w-92 mx-auto mt-20 gap-10">
      <Form list={list} setList={setList} />

      <div>
        <h2 className="text-center mb-2 font-bold text-2xl">Lista de items</h2>
        {list.length > 0 ? (
          <ItemList list={list} setList={setList} />
        ) : (
          <p className="text-zinc-400 text-center">
            Nenhum item adicionado ainda.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
