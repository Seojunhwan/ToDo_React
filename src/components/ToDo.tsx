import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDoState } from "./atoms";
import { Button } from "./CreateToDo";

const List = styled.li`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  position: relative;
  padding: 10px 0px;
  transition: box-shadow 0.2s ease-out;
  border-radius: 5px;
  span {
    text-align: center;
  }
  &:hover {
    box-shadow: rgba(27, 31, 35, 0.04) 0px 1px 0px,
      rgba(255, 255, 255, 0.25) 0px 1px 0px inset;
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;

export const DoingButton = styled(Button)`
  background-color: #ffde82;
`;
export const ToDoButton = styled(Button)`
  background-color: #ff9433;
`;
export const DoneButton = styled(Button)`
  background-color: #78e08f;
`;

const CategoryButton = styled(Button)`
  background-color: #aaae8a;
`;

const DeleteButton = styled(Button)`
  background-color: #ff9999;
`;

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
  const deleteToDo = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <List>
      <Buttons>
        {category !== Categories.DOING &&
          category !== Categories.TO_DO &&
          category !== Categories.DONE && (
            <CategoryButton as={"span"}>{category}</CategoryButton>
          )}
        {category !== Categories.DOING && (
          <DoingButton onClick={() => onClick(Categories.DOING)}>
            ?????? ???!
          </DoingButton>
        )}
        {category !== Categories.TO_DO && (
          <ToDoButton onClick={() => onClick(Categories.TO_DO)}>
            ?????????
          </ToDoButton>
        )}
        {category !== Categories.DONE && (
          <DoneButton onClick={() => onClick(Categories.DONE)}>
            ??? ??????!
          </DoneButton>
        )}
        <DeleteButton onClick={deleteToDo}>?????????</DeleteButton>
      </Buttons>
      <span>{text}</span>
    </List>
  );
}
export default ToDo;
