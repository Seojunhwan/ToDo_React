import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoSelector } from "./atoms";
import CategoryButtons from "./CategoryButtons";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Container = styled.main`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 30px;
  margin: 30px;
  text-align: center;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  return (
    <Container>
      <Title>To Dos</Title>
      <CategoryButtons />
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </Container>
  );
}

export default ToDoList;
