import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import{LoginService} from '../service/login.service';
import { Router, RouterModule } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  submitForm(): void {
    let data={};
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      data[i]=this.validateForm.controls[i].value;
    }
    this.loginService.login(data).subscribe(data=>{
     if(data.isok){
        this.router.navigate(['/home']);
     }else{
      this.message.create('error', data.msg);

     }
    });
  }

  constructor(private fb: FormBuilder,
              private loginService:LoginService,
              private router:Router,
              private message: NzMessageService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

}
