import { useRecoilValue } from "recoil";
import { toDoState } from "./atoms";
import CreateToDo from "./CreateToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoState);
  return (
    <div>
      <h1>To Dos</h1>
      <CreateToDo />
      <hr />
      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
