import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NewCatergoryComponent } from './pages/new-catergory/new-catergory.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { WebReqInterceptor } from './web-req.interceptor';
import { EditCatergoryComponent } from './pages/edit-catergory/edit-catergory.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    NewCatergoryComponent,
    NewTaskComponent,
    EditCatergoryComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
