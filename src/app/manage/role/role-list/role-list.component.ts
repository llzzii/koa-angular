import { Component, OnInit, ViewChild } from "@angular/core";
import { formatDate } from "@angular/common";
import { UserService } from "../../../service/user.service";
import { NzModalRef, NzModalService, NzMessageService } from "ng-zorro-antd";
import { Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-role-list",
  templateUrl: "./role-list.component.html",
  styleUrls: ["./role-list.component.css"]
})
export class RoleListComponent implements OnInit {
  updateValidateForm: any;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private modalService: NzModalService,
    private message: NzMessageService
  ) {
    this.initAddForm();
  }
  @ViewChild("addValidateForm", { static: false }) addValidateForm: any;
  listOfData: any[] = [];
  bordered = false;
  loading = false;
  sizeChanger = true;
  pagination = true;
  header = true;
  expandable = true;
  checkbox = true;
  allChecked = false;
  indeterminate = false;
  displayData: any[] = [];

  nzTotal: number;
  pageSize: number = 10;
  current: number = 1;

  mapOfSort: { [key: string]: any } = {
    number: null,
    role_name: null,
    created_time: null
  };
  sortName: string = "created_time";
  sortValue: string = "descend";
  queryData: string = "";
  numbers: string = "";
  isShowAddValidateForm = false;
  getRoleListData(): void {
    this.loading = true;
    this.userService.getRoleList(this.current, this.pageSize, this.sortName, this.sortValue, this.queryData).subscribe(
      data => {
        this.loading = false;
        this.listOfData = data.dataList || [];
        this.displayData = data.dataList || [];
        this.nzTotal = data.totalRows;
        this.numbers = this.nzTotal + "";
        let num = 4 - (this.nzTotal + "").length;
        for (let i = 0; i < num; i++) {
          this.numbers = "0" + this.numbers;
        }
      },
      error => {
        this.loading = false;
      }
    );
  }
  creatRole(addTempalte) {
    const that = this;
    const modal = this.modalService.create({
      nzTitle: "添加角色",
      nzContent: addTempalte,
      nzOnOk: () => {
        let isValid: boolean = that.roleSubmit();
        return isValid;
      },
      nzClosable: false
    });

    // modal.afterClose.subscribe(result => {
    //   that.addValidateForm.reset();
    // });
  }
  roleSubmit() {
    const data = {};
    for (const key in this.addValidateForm.controls) {
      this.addValidateForm.controls[key].markAsDirty();
      this.addValidateForm.controls[key].updateValueAndValidity();
      data[key] = this.addValidateForm.controls[key].value;
    }
    if (this.addValidateForm.status !== "VALID") return false;
    this.userService.createRole(data).subscribe(data => {
      this.message.create(`${data.isok == 1 ? "success" : "error"}`, `${data.msg}`);
      this.getRoleListData();
    });
    return true;
  }
  updateUser(data) {
    const modal = this.modalService.create({
      nzTitle: "编辑用户",
      nzContent: "",
      nzComponentParams: {
        rowdata: data
      },
      nzOnOk: () => {
        let isValid: boolean = modal.getContentComponent().submitForm();
        modal.getContentComponent().createSucceed.subscribe(() => {
          this.getRoleListData();
        });
        return isValid;
      }
    });
  }
  deleteRole(data = null) {
    this.loading = true;
    let ids = "";
    if (data == null) {
      debugger;
      this.listOfData.forEach((e, i, arr) => {
        if (e.checked) {
          ids += e.id + ",";
        }
      });
      data = ids;
    }

    this.userService.deleteUser(data).subscribe(
      data => {
        this.loading = false;
        this.getRoleListData();
        this.message.create(`${data.isok == 1 ? "success" : "error"}`, `${data.msg}`);
      },
      error => {
        this.loading = false;
      }
    );
  }
  refreshPassword(data) {
    this.loading = true;
    data["password"] = "123456";
    this.userService.refreshPassword(data).subscribe(
      data => {
        this.loading = false;
        this.message.create(`${data.isok == 1 ? "success" : "error"}`, `${data.msg}`);
      },
      error => {
        this.loading = false;
      }
    );
  }

  sort(sortName: string, value: string): void {
    this.sortName = sortName;
    this.sortValue = value;
    for (const key in this.mapOfSort) {
      this.mapOfSort[key] = key === sortName ? value : null;
    }
  }

  currentPageDataChange(
    $event: Array<{
      name: string;
      age: number;
      address: string;
      checked: boolean;
      expand: boolean;
      description: string;
    }>
  ): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    const validData = this.displayData.filter(value => !value.disabled);
    const allChecked = validData.length > 0 && validData.every(value => value.checked === true);
    const allUnChecked = validData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = !allChecked && !allUnChecked;
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }
  initAddForm() {
    this.addValidateForm = this.fb.group({
      number: [this.numbers, [Validators.required, Validators.pattern("^[0-9]+$"), Validators.maxLength(36)]],
      role_name: [null, [Validators.required]],
      is_create: [false, [Validators.required]],
      is_delete: [false, [Validators.required]],
      is_update: [false, [Validators.required]],
      is_view: [false, [Validators.required]],
      is_action: [false, [Validators.required]],
      description: ["", [Validators.maxLength(255)]]
    });
  }
  ngOnInit(): void {
    this.getRoleListData();
  }
}
