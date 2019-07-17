import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tasks: any;
    
  constructor(private _httpService: HttpService) {}

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks(){
    console.log("Get All Tasks Is Running")
    this._httpService.getTasks().subscribe( data => {
      console.log("Successfully got task:", data)
      this.tasks = data['data']
    })
  }
  deleteOneTask(id){
    this._httpService.deleteTask(id).subscribe( data =>{
      console.log("Deleted Data")
      this.getAllTasks();
    })
  }
}
