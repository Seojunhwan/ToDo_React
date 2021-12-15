import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, categoryState } from "./atoms";
import { Button } from "./CreateToDo";
import { Buttons, DoingButton, ToDoButton, DoneButton } from "./ToDo";

const OtherButton = styled(Button)`
  background-color: #738ff3;
`;

function CategoryButtons() {
  const setCategory = useSetRecoilState(categoryState);
  const changeCategory = (event: React.FormEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCategory(value as any);
  };
  return (
    <Buttons>
      <ToDoButton value={Categories.TO_DO} onClick={changeCategory}>
        To Do
      </ToDoButton>
      <DoingButton value={Categories.DOING} onClick={changeCategory}>
        Doing
      </DoingButton>
      <DoneButton value={Categories.DONE} onClick={changeCategory}>
        Done
      </DoneButton>
      <OtherButton value={Categories.OTHER} onClick={changeCategory}>
        Other
      </OtherButton>
    </Buttons>
  );
}

export default CategoryButtons;
