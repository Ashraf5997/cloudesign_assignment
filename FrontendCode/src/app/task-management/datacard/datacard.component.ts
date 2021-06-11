import { Component, OnInit, Output,EventEmitter } from '@angular/core';

/* IMPORTING MODULES & COMPONENTS */
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {TaskServiceService} from '../task-service.service';



@Component({
  selector: 'app-datacard',
  templateUrl: './datacard.component.html',
  styleUrls: ['./datacard.component.css']
})
export class DatacardComponent implements OnInit {

   //  TO SEND DATA IN DIFFERENT COMPONENTS
  @Output() sendToComponents  = new EventEmitter();

  constructor(private taskService : TaskServiceService ) {

   }

  totalTask:any;
  public countToDo=0;
  public countInProgress=0;
  public countCompleted= 0;

  statusArray =['Open', 'In-Progress' , 'Completed']

  fetchedTask :any
  allOpenTask:any;
  allProgressTask :any;
  allCompletedTask:any;

  DragAndDrop(event: CdkDragDrop<string[]>) {
    
    if (event.previousContainer === event.container) {
    
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)

    
    } else {

      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
                        let eventData =event.container.data[event.currentIndex];

                       for (const i in this.allOpenTask) {
                           if( this.allOpenTask[i] == eventData){
                             this.updatetaskStatus( this.allOpenTask[i].taskId , 'Open')
                           }

                           if( this.allProgressTask[i] == eventData){
                            this.updatetaskStatus( this.allProgressTask[i].taskId , 'In-Progress')
                          }

                          if( this.allCompletedTask[i] == eventData){
                            this.updatetaskStatus( this.allCompletedTask[i].taskId , 'Completed')
                         }
                     }
    }
  }

  updatetaskStatus(taskId:any , cStatus:any){
      let reqDataObj={
        taskStatus:cStatus
      }
      this.taskService.updateTaskStatusById(taskId , reqDataObj ).subscribe(response=>{
       this.taskService.CWC();
      })
     
  }
  // DELETE TASK

  deleteTask(id:any){
    this.taskService.deleteTaskById(id).subscribe(response=>{
      this.taskService.CWC();
    })
  }

  UpdateTask(id:any,title:any,description:any){
      let toEditObj = {
        taskId :id,
        taskDescription:description,
        taskTitle:title
      }
      this.taskService.shareData(toEditObj)
     // this.sendToComponents.emit(toEditObj);
  }

  ngOnInit(): void {
   
   this.taskService.msg_Task_Created.subscribe(res=>{
     console.log(" MSG FROM CWC : new task is created.");
     // fetching All tasks
       // this.getAllTask();
        this.fetchTaskByStatus();

   })
  }

  getAllTask(){
    this.taskService.getAllTask().subscribe(res=>{
      this.fetchedTask = res;
      console.log(this.fetchedTask);
      this.totalTask = Object.keys(res).length
  });
  }

  // GET ALL  TASK BY STATUS
  fetchTaskByStatus(){
   
    for(let i=0 ; i<3 ; i++){
     this.taskService.getTaskByStatus(this.statusArray[i]).subscribe(res=>{
      if(i == 0){  this.allOpenTask =  res;       this.countToDo = Object.keys(res).length}
      if(i == 1){  this.allProgressTask = res;    this.countInProgress = Object.keys(res).length}
      if(i == 2){  this.allCompletedTask = res;   this.countCompleted = Object.keys(res).length}
      });
    }
    
  }
  
 
  

}

