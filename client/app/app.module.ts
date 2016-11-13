import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from "./components/app.component";
import {TasksComponent} from "./components/tasks.component";
import {HttpModule} from "@angular/http";
import {FormsModule} from '@angular/forms';
import {TaskService} from "./services/task.service";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    TasksComponent
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
