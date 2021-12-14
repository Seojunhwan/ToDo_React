import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "./atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (newCategory: IToDo["category"]) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: newCategory };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== "DOING" && (
        <button onClick={() => onClick("DOING")}>하는 중!</button>
      )}
      {category !== "TO_DO" && (
        <button onClick={() => onClick("TO_DO")}>해야해</button>
      )}
      {category !== "DONE" && (
        <button onClick={() => onClick("DONE")}>다 했다!</button>
      )}
    </li>
  );
}
export default ToDo;
