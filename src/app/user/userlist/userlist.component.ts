import { Component, OnInit } from "@angular/core";
import { formatDate } from "@angular/common";
import { UserService } from "../../service/user.service";
import { NzModalRef, NzModalService, NzMessageService } from "ng-zorro-antd";
import { AdduserComponent } from "../adduser/adduser.component";
import { UpdateuserComponent } from "../updateuser/updateuser.component";
@Component({
  selector: "app-userlist",
  templateUrl: "./userlist.component.html",
  styleUrls: ["./userlist.component.css"]
})
export class UserlistComponent implements OnInit {
  [x: string]: any;
  constructor(private userService: UserService, private modalService: NzModalService, private message: NzMessageService) {}

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
  current: number = 0;

  mapOfSort: { [key: string]: any } = {
    name: null,
    age: null,
    address: null
  };
  sortName: string | null = null;
  sortValue: string | null = null;

  getUserListData(): void {
    this.loading = true;
    this.userService.getUserList().subscribe(
      data => {
        this.loading = false;
        this.listOfData = data || [];
        this.displayData = data || [];
        this.nzTotal = this.listOfData.length;
      },
      error => {
        this.loading = false;
      }
    );
  }
  creatUser() {
    const modal = this.modalService.create({
      nzTitle: "添加用户",
      nzContent: AdduserComponent,
      nzOnOk: () => {
        let isValid: boolean = modal.getContentComponent().submitForm();
        modal.getContentComponent().createSucceed.subscribe(() => {
          this.getUserListData();
        });
        return isValid;
      }
    });
  }

  updateUser(data) {
    const modal = this.modalService.create({
      nzTitle: "编辑用户",
      nzContent: UpdateuserComponent,
      nzComponentParams: {
        rowdata: data
      },
      nzOnOk: () => {
        let isValid: boolean = modal.getContentComponent().submitForm();
        modal.getContentComponent().createSucceed.subscribe(() => {
          this.getUserListData();
        });
        return isValid;
      }
    });
  }
  deleteUser(data) {
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
        this.getUserListData();
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

  ngOnInit(): void {
    this.getUserListData();
  }
}
