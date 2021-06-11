
import { Injectable } from '@angular/core';

/* IMPORT MODULE */
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs' ;



@Injectable({
  providedIn: 'root'
})

export class TaskServiceService {
  

  constructor(private http : HttpClient) {
   
   }

  // SUBJECTS for string
  msg_Task_Created = new Subject();

  // subject of array
  private sendToCom = new Subject<[]>();
  receiver=this.sendToCom.asObservable(); 

  shareData(data:any){
     this.sendToCom.next(data);
  }


  // FETCHING ALL TASK
  getAllTask(){
    let url ="http://localhost:9000/api/v1/tasks";
    return this.http.get(url);
  }

   // CREATEING TASK
   createTask(reqDataObj: { taskTitle: string; taskDescription: string; taskStatus: string; }){
    let url ="http://localhost:9000/api/v1/createTask";
    return this.http.post<any>(url,reqDataObj);
  }

  // DELETING TASK
  deleteTaskById(id:any){
    let url =`http://localhost:9000/api/v1/deleteTask/${id}`;
    return this.http.delete(url);
  }

   // UPDATE TASK STATUS
   updateTaskStatusById(taskId:any , reqDataObj:{ taskStatus :string}){
   
    let url =`http://localhost:9000/api/v1/updateStatus/${taskId}`;
    return this.http.put(url ,reqDataObj);
  }

  // UPDATE TASK 
  updateTask(taskId:any , reqDataObj:{ taskTitle :string;taskDescription:string;}){
   
    let url =`http://localhost:9000/api/v1/updateTask/${taskId}`;
    return this.http.put(url ,reqDataObj);
  }

  // GET  TASK by STATUS
  getTaskByStatus(status:any){
    let url =`http://localhost:9000/api/v1/tasks/${status}`;
    return this.http.get(url);
  }

  // COMMUNICATING WITH COMPONENTS
  // =====> CWC = CommunicationWithComponent

  CWC(){
     this.msg_Task_Created.next(); 
  }


}
/*
function shareDataToCom() {
  throw new Error('Function not implemented.');
}

function drugs(drugs: any, IDrug: any) {
  throw new Error('Function not implemented.');
}*/

