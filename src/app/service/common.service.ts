import { Injectable } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd";
@Injectable({
  providedIn: "root",
})
export class CommonService {
  constructor(private nzMessageService: NzMessageService) { }
  error(error) {
    this.nzMessageService.create("error", `error`);
  }
}
