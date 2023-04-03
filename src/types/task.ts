export interface Task {
  id: number;
  name: string;
  category: {
    categoryId: string;
    translation: string;
  };
  difficulty: {
    id: string;
    translation: string;
  };
  done?: boolean;
}

export interface SolvedTask {
  taskGeneralInfo: {
    id: number;
    name: string;
    category: {
      categoryId: string;
      translation: string;
    };
    difficulty: {
      id: string;
      translation: string;
    };
  };
  language: {
    languageId: string;
    translation: string;
  };
  submissionDate: Date;
  content: string;
  solverUsername: string;
}

export interface TaskExtended {
  id: number;
  name: string;
  content: string;
  category: string;
  difficulty: {
    id: string;
    translation: string;
  };
  hints: { content: string; level: number }[];
  availableLanguages: string[];
  templates: {
    id: number;
    content: string;
    language: string;
    taskId: number;
  }[];
}
