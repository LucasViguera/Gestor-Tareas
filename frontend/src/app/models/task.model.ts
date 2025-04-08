export interface Task {
  id: number;        
  title: string;        
  description: string;    
  startDate: string;   
  endDate: string;       
  priority: string;     
  assigneeId: number | null; 
  completed: number;    
}