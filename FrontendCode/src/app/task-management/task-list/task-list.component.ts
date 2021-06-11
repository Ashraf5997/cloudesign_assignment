

import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import {TaskServiceService} from '../task-service.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  constructor(private taskService : TaskServiceService) {
    this.countTask();
  }

   public totalTask:any;
   public Count:any
   public isFormVisible = false;

   countTask(){
    this.taskService.getAllTask().subscribe(data=>{
      this.totalTask = data
       this.Count = Object.keys(data).length

        this.taskService.CWC();
    });
  }
 
  

  displayForm(){
    this.isFormVisible= ! this.isFormVisible;
  }

  ngOnInit(): void {  }

}
