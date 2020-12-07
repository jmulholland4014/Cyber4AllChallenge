import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }


  getCatergorys() {
    return this.webReqService.get('catergorys');
  }

  createCatergory(title: string) {
    
    return this.webReqService.post('catergorys', { title });
  }

  updateCatergory(id: string, title: string) {
    
    return this.webReqService.patch(`catergorys/${id}`, { title });
  }

  updateTask(catergoryId: string, taskId: string, title: string) {
    
    return this.webReqService.patch(`catergorys/${catergoryId}/tasks/${taskId}`, { title });
  }

  deleteTask(catergoryId: string, taskId: string) {
    return this.webReqService.delete(`catergorys/${catergoryId}/tasks/${taskId}`);
  }

  deleteCatergory(id: string) {
    return this.webReqService.delete(`catergorys/${id}`);
  }

  getTasks(catergoryId: string) {
    return this.webReqService.get(`catergorys/${catergoryId}/tasks`);
  }

  createTask(title: string, catergoryId: string) {
    
    return this.webReqService.post(`catergorys/${catergoryId}/tasks`, { title });
  }

  complete(task: Task) {
    return this.webReqService.patch(`catergorys/${task._catergoryId}/tasks/${task._id}`, {
      completed: !task.completed
    });
  }
}
