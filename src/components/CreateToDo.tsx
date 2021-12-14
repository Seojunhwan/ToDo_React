import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "./atoms";

interface IForm {
  toDo: string;
  extraError?: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", { required: "할 일을 입력해주세요!" })}
        type="text"
        placeholder="할 일을 입력해주세요!"
      />
      <span>{errors?.toDo?.message}</span>
      <button>딸깍</button>
    </form>
  );
}

export default CreateToDo;
