import { Component, OnInit } from '@angular/core';
import { DataService } from './../data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public array:any = [];
  constructor(private http: HttpClient,private router:Router,private newservice:DataService) { }

  ngOnInit() {
    this.newservice.listUser().subscribe((resultArray: any) => {
      console.log('xxxxxxxx xxxxxxxx xxxxxxxx response is ', resultArray.body);
      this.array =  resultArray.body
     });
  }
}
