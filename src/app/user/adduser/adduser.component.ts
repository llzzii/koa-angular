import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd";
import { UserService } from "../../service/user.service";

@Component({
  selector: "app-adduser",
  templateUrl: "./adduser.component.html",
  styleUrls: ["./adduser.component.css"]
})
export class AdduserComponent implements OnInit {
  validateForm: FormGroup;
  @Output() createSucceed = new EventEmitter();
  constructor(private fb: FormBuilder, private message: NzMessageService, private userService: UserService) {}

  submitForm(): boolean {
    let data = {};
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      data[i] = this.validateForm.controls[i].value;
    }
    if (!this.validateForm.valid) return false;
    this.create(data);
    return true;
  }

  create(data) {
    const mid = this.message.loading("正在创建中", { nzDuration: 0 }).messageId;
    this.userService.createUser(data).subscribe(
      respose => {
        this.createSucceed.emit();
        this.message.create(`${respose.isok == 1 ? "success" : "error"}`, `${respose.msg}`);
        this.message.remove(mid);
      },
      error => {
        this.message.remove(mid);
      }
    );
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email]],
      username: [null, [Validators.required]],
      tel: [null, [Validators.pattern("^1(3|4|5|7|8)\\d{9}$")]],
      address: [null],
      age: [null, [Validators.pattern("^[1-9]+$")]]
    });
  }
}
