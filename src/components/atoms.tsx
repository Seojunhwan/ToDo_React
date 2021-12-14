import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
  "OTHER" = "OTHER",
}
export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const addCategory = atom({
  key: "addCategory",
  default: false,
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    if (category === Categories.OTHER)
      return toDos.filter(
        (toDo) =>
          toDo.category !== Categories.DOING &&
          toDo.category !== Categories.TO_DO &&
          toDo.category !== Categories.DONE
      );
    return toDos.filter((toDo) => toDo.category === category);
  },
});
