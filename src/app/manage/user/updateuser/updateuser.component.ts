import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd";
import { UserService } from "../../../service/user.service";

@Component({
  selector: "app-updateuser",
  templateUrl: "./updateuser.component.html",
  styleUrls: ["./updateuser.component.css"]
})
export class UpdateuserComponent implements OnInit {
  validateForm: FormGroup;
  @Output() createSucceed = new EventEmitter();
  @Input() rowdata;
  constructor(private fb: FormBuilder, private message: NzMessageService, private userService: UserService) {}

  submitForm(): boolean {
    let data = {};
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      data[i] = this.validateForm.controls[i].value;
    }
    if (!this.validateForm.valid) return false;
    data["id"] = this.rowdata.id;
    this.update(data);
    return true;
  }

  update(data) {
    const mid = this.message.loading("正在修改中", { nzDuration: 0 }).messageId;
    this.userService.updateUser(data).subscribe(
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
