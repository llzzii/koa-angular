import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgZorroAntdModule, NZ_I18N, zh_CN } from "ng-zorro-antd";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { registerLocaleData } from "@angular/common";
import zh from "@angular/common/locales/zh";
registerLocaleData(zh);
import { UserlistComponent } from "./user/userlist/userlist.component";
import { AdduserComponent } from "./user/adduser/adduser.component";
import { UpdateuserComponent } from "./user/updateuser/updateuser.component";
import { InterceptorProvider } from "../httpCommon/interceptor-provider";
import { UserService } from "../service/user.service";

import { DetailComponent } from "./user/detail/detail.component";
import { AddDeptComponent } from "./department/add-dept/add-dept.component";
import { UpdateDeptComponent } from "./department/update-dept/update-dept.component";
import { DeptDetailComponent } from "./department/dept-detail/dept-detail.component";
import { RoleDetailComponent } from "./role/role-detail/role-detail.component";
@NgModule({
  declarations: [
    UserlistComponent,
    AdduserComponent,
    UpdateuserComponent,
    DetailComponent,
    AddDeptComponent,
    UpdateDeptComponent,
    DeptDetailComponent,
    RoleDetailComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  entryComponents: [AdduserComponent, UpdateuserComponent],
  providers: [InterceptorProvider, UserService]
})
export class UserModule {}
