import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Router } from '@angular/router';
import { Catergory } from 'src/app/models/catergory.model';

@Component({
  selector: 'app-new-catergory',
  templateUrl: './new-catergory.component.html',
  styleUrls: ['./new-catergory.component.scss']
})
export class NewCatergoryComponent implements OnInit {

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
  }

  createCatergory(title: string) {
    this.taskService.createCatergory(title).subscribe((catergory: Catergory) => {
      console.log(catergory);
      
      this.router.navigate([ '/catergorys', catergory._id ]); 
    });
  }

}
