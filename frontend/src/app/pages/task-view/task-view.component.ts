import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { Catergory } from 'src/app/models/catergory.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  catergorys: Catergory[];
  tasks: Task[];

  selectedCatergoryId: string;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.catergoryId) {
          this.selectedCatergoryId = params.catergoryId;
          this.taskService.getTasks(params.catergoryId).subscribe((tasks: Task[]) => {
            this.tasks = tasks;
          })
        } else {
          this.tasks = undefined;
        }
      }
    )

    this.taskService.getCatergorys().subscribe((catergorys: Catergory[]) => {
      this.catergorys = catergorys;
    })
    
  }

  onTaskClick(task: Task) {
    
    this.taskService.complete(task).subscribe(() => {
      
      console.log("Completed successully!");
      task.completed = !task.completed;
    })
  }

  onDeleteCatergoryClick() {
    this.taskService.deleteCatergory(this.selectedCatergoryId).subscribe((res: any) => {
      this.router.navigate(['/catergorys']);
      console.log(res);
    })
  }

  onDeleteTaskClick(id: string) {
    this.taskService.deleteTask(this.selectedCatergoryId, id).subscribe((res: any) => {
      this.tasks = this.tasks.filter(val => val._id !== id);
      console.log(res);
    })
  }

}
