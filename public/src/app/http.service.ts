import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient){}

  getTasks(){
    return this._http.get('/tasks')
  }
  newTask(data){
    return this._http.post('/tasks', data)
  }
  deleteTask(id){
    return this._http.delete(`/tasks/${id}`)
  }
  getTask(id){
    return this._http.get(`/tasks/${id}`)
  }
  editTask(task){
    return this._http.put(`/tasks/${task._id}`, task)
  }
} 


