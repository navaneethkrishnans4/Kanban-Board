import { Injectable } from '@angular/core';
import emailjs from 'emailjs-com';
import { User } from '../model/User';
import { TaskServiceService } from './task-service.service';
import { Task } from '../model/Task';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private taskService:TaskServiceService) { }

  // async findTaskfromEmailId(userEmailId : string):Promise<Task|undefined>
  // { let filteredTask:Task;

  //   return new Promise<Task | undefined>((resolve,reject)=>{
  //     this.taskService.getTasks().subscribe(tasks => {
  //       const filteredTask = tasks.find(task => task.emailId == userEmailId);
  //       resolve(filteredTask);
  //   },error=>{
  //     reject(error);
  //   });
  // });
    
  // }
  // async sendEmail(selectedUser:User)
  // { 
  //   let newTask = await this.findTaskfromEmailId(selectedUser.emailId);
  //   emailjs.init('TsJyI2fk-sY-g13Yz')
  //   emailjs.send("service_7kf02fr","template_ihbtqvb",{
  //     from_name: "Kanban Board",
  //     to_name: selectedUser.firstName,
  //     message: "A new task "+ newTask?.taskTitle+ " has been assigned to you!",
  //     reply_to: "",
  //     to_email: "navaneethkrishnans4@gmail.com",
  //     }).then((response) => {
  //       console.log('Email sent successfully:', response);
  //   }, (error) => {
  //       console.error('Email could not be sent:', error);
  //   });
  // }

  sendEmail(task:Task,selectedUser:User|undefined,message:string)
  {
    let status;
    this.taskService.getStatus().subscribe(statusArray => {
      status = statusArray.find(status => status.statusCode == task.statusCode);
      
      emailjs.init('TsJyI2fk-sY-g13Yz')
    emailjs.send("service_7kf02fr","template_ihbtqvb",{
      from_name: "Kanban Board",
      to_name: selectedUser?.firstName,
      message: "A new task "+ task?.taskTitle+ " has been assigned to you, and Status is : " + status.statusTitle,
      reply_to: "",
      to_email: "navaneethkrishnans4@gmail.com",
      }).then((response) => {
        console.log('Email sent successfully:', response);
    }, (error) => {
        console.error('Email could not be sent:', error);
    });

    });
    
  }
}
