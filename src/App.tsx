import { useState } from "react";
import Form from "./components/Form";
import Button from "./components/Button";

function App() {
  const [list, setList] = useState<string[]>([]);

  return (
    <div className="flex flex-col w-92 mx-auto mt-20 gap-10">
      <Form list={list} setList={setList} />

      <div>
        <h2 className="text-center mb-2 font-bold text-2xl">Lista de items</h2>
        {list.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {list.map((task, index) => (
              <li
                key={index}
                className="border-2 border-black p-2 px-5 flex justify-between items-center"
              >
                {task}

                <Button
                  type="button"
                  onClick={() => setList(list.filter((_, pos) => pos != index))}
                >
                  X
                </Button>
              </li>
            ))}
          </ul>
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
