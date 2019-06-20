import { Component, OnInit } from '@angular/core';
import { DataService } from './../data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Add } from './../models/add';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public image: string = "";
  constructor(private http: HttpClient, private router: Router, private newservice: DataService) { }
  // userInfoVo:any;
  userForm = new FormGroup({
    companyName: new FormControl(''),
    price: new FormControl(''),
    image: new FormControl(''),

    email: new FormControl('')

  });
  ngOnInit() {

  }
  files: any;
  onFileChanged(event: any) {
    this.files = event.target.files;
  }
  onSubmit() {
    console.log("llll", this.userForm.value);
    this.userForm.value.image = this.image;
    console.log("image", this.files[0]);
    const data = new FormData();
    data.append("companyName", this.userForm.value.companyName)
    data.append("price", this.userForm.value.price);
    data.append("email", this.userForm.value.email);
    data.append("image", this.files[0]);
    this.newservice.addUser(data).subscribe(resultArray => {
      console.log("res", resultArray);
    })
  }
}
