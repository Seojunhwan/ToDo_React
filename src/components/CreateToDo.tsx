import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, categoryState, IToDo, toDoState } from "./atoms";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 15px 0px;
`;

const Input = styled.input<{ borderColor: string }>`
  padding: 10px 0px;
  border: 0;
  margin-bottom: 10px;
  border-bottom: 2px solid #ebeeff;
  transition: all 0.3s ease-in-out;
  text-align: center;
  border-bottom: 2px solid
    ${(props) => (props.borderColor ? props.borderColor : "#ebeeff")};
  &:focus {
    border-bottom: 2px solid ${(props) => props.borderColor};
  }
`;

export const Button = styled.button<{ bgColors?: string }>`
  border: none;
  transition: all 0.2s ease-in-out;
  background-color: ${(props) => props.bgColors};
  color: white;
  padding: 10px;
  font-family: inherit;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

interface IForm {
  toDo: string;
  extraError?: string;
  category?: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue<IToDo["category"]>(categoryState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<IForm>();
  const handleValid = ({ toDo, category: custom }: IForm) => {
    setToDos((oldToDos) => [
      {
        text: toDo,
        id: Date.now(),
        category: (custom as IToDo["category"]) || category,
      },
      ...oldToDos,
    ]);
    setValue("toDo", "");
    setValue("category", "");
  };
  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      {category === Categories.OTHER ? (
        <Input
          {...register("category", {
            required: "카테고리를 입력해주세요!",
          })}
          placeholder="카테고리를 입력해주세요!"
          autoComplete="off"
          borderColor={
            errors.category?.message
              ? "#ff7073"
              : watch().category
              ? "#78e08f"
              : "#ebeeff"
          }
        />
      ) : (
        ""
      )}
      <Input
        {...register("toDo", { required: "할 일을 입력해주세요!" })}
        type="text"
        placeholder="오늘은 어떤 일을 해볼까요?"
        autoComplete="off"
        borderColor={
          errors.toDo?.message
            ? "#ff7073"
            : watch().toDo
            ? "#78e08f"
            : "#ebeeff"
        }
      />
      <Button
        bgColors={
          errors.toDo?.message
            ? "#ff7073"
            : errors.category?.message
            ? "#ff7073"
            : watch().toDo
            ? "#78e08f"
            : "#ebeeff"
        }
      >
        {errors.category?.message ?? errors?.toDo?.message ?? "딸깍"}
      </Button>
    </Form>
  );
}

export default CreateToDo;
