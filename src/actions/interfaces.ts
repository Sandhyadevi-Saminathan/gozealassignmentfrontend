// types.ts (or wherever you define your interfaces)

export interface Project {
    _id: string;
    userId: string | null;
    projectName: string;
    startDate: string;
    dueDate: string;
    description: string;
    status: string;
  }
  
  export interface AuthState {
    userId: string | null;
    // other auth-related state...
  }
  
  export interface ProjectState {
    projects: Project[];
    project: Project | null; // for the single project being edited
    // other project-related state...
  }
  
  export interface RootState {
    auth: AuthState;
    projects: ProjectState;
    // other slices...
  }
  