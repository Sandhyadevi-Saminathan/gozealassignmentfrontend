

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
  
  }
  
  export interface ProjectState {
    projects: Project[];
    project: Project | null; // for the single project being edited
   
  }
  
  export interface RootState {
    auth: AuthState;
    projects: ProjectState;
    
  }
  