export interface AddOneTodoProps {
  status: string;
  setActive:(value:boolean)=>void
}

export interface FormFieldProps {
  placeholder: string;
  label: string;
  value: string;
  type: string;
  name: string;
  id: string;
  setChange: (value: string) => void;
}
export interface AddCategoryProps {
  status?: string;
}
export interface OneToDoProps {
  id: number;
  title: string;
  description: string;
  members: string;
  comments: string;
  duedate: string;
  estimatedtime?: string;
  remainingtime?: string;
  timeNow: number;
  status?: string;
}

export interface OnePost {
  id: number;
  title: string;
  description: string;
  members: string;
  comments: string;
  duedate: string;
  timeNow: number;
  estimatedtime: string;
  remainingtime: string;
  status?: string;
}

export interface Card {
  id: string;
}
export interface BlockAreaProps {
  dragLight: string,
  setDragLight: (value:string)=>void;
  status: string;
  currentToDo: any;
}

export interface OneCategoryProps {
  index: number;
  status: string,
  dragCategoryLight:string;
  dragLight: string,
  setDragLight: (value:string)=>void;
  currentToDo: any;
  setCurrentToDo: any;
}

export interface EditToDoProps {
  id: number;
  setActive:(value:boolean)=>void
}

export type FormDataEdit = {
  todoTitleEdit: string;
  descriptionEdit: string;
  membersEdit: string,
  commentsEdit: string,
};

export type FormData = {
  todoTitle: string;
  description: string;
  duedate: string;
  members: string,
  comments: string,
};