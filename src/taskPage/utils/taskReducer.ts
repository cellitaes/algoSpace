import { SingleValue } from "react-select";
import { TaskExtended } from "../../types/task";

export interface TaskState {
  task?: TaskExtended | null;
  language?: SingleValue<{ value: string; label: string }>;
  theme?: {
    label: string;
    value: string;
  };
  code?: string;
  descriptionMode?: boolean;
  showOutput?: boolean;
  left?: string;
  introWidth?: string;
  editorWidth?: string;
}

export interface ActionReducer extends TaskState {
  type: string;
}

export const manageTaskState = (
  state: TaskState,
  action: ActionReducer
): TaskState => {
  switch (action.type) {
    case "SET_TASK":
      return {
        ...state,
        task: action.task,
      };
    case "CODE_CHANGE":
      return {
        ...state,
        code: action.code,
      };
    case "SET_THEME":
      return {
        ...state,
        theme: action.theme,
      };
    case "SET_NEW_WIDTH":
      return {
        ...state,
        introWidth: action.introWidth,
        editorWidth: action.editorWidth,
        left: action.left,
      };
    case "SET_LANGUAGE":
      return {
        ...state,
        language: action.language,
      };
    case "SET_DESCRIPTIONMODE":
      return {
        ...state,
        descriptionMode: action.descriptionMode,
      };
    default:
      return state;
  }
};

export const initTasktate: TaskState = {
  task: null,
  language: {
    value: "",
    label: "",
  },
  theme: {
    label: "Amy",
    value: "amy",
  },
  code: "",
  descriptionMode: true,
  showOutput: false,
  left: "40",
  introWidth: "40",
  editorWidth: "60",
};
