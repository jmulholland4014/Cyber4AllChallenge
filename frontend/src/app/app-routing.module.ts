import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewCatergoryComponent } from './pages/new-catergory/new-catergory.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { EditCatergoryComponent } from './pages/edit-catergory/edit-catergory.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';

const routes: Routes = [
  { path: '', redirectTo: '/catergorys', pathMatch: 'full' },
  { path: 'new-catergory', component: NewCatergoryComponent },
  { path: 'edit-catergory/:catergoryId', component: EditCatergoryComponent },
  { path: 'catergorys', component: TaskViewComponent },
  { path: 'catergorys/:catergoryId', component: TaskViewComponent },
  { path: 'catergorys/:catergoryId/new-task', component: NewTaskComponent },
  { path: 'catergorys/:catergoryId/edit-task/:taskId', component: EditTaskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
