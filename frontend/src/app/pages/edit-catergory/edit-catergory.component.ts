import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-edit-catergory',
  templateUrl: './edit-catergory.component.html',
  styleUrls: ['./edit-catergory.component.scss']
})
export class EditCatergoryComponent implements OnInit {

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) { }

  catergoryId: string;

  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.catergoryId = params.catergoryId;
        console.log(params.catergoryId);
      }
    )
  }

  updateCatergory(title: string) {
    this.taskService.updateCatergory(this.catergoryId, title).subscribe(() => {
      this.router.navigate(['/catergorys', this.catergoryId]);
    })
  }

}
