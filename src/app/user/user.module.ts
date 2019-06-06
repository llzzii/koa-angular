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
import { UserlistComponent } from "./userlist/userlist.component";
import { AdduserComponent } from "./adduser/adduser.component";
import { UpdateuserComponent } from "./updateuser/updateuser.component";
import { InterceptorProvider } from "../httpCommon/interceptor-provider";
import { UserService } from "../service/user.service";

import { DetailComponent } from "./detail/detail.component";
@NgModule({
  declarations: [UserlistComponent, AdduserComponent, UpdateuserComponent, DetailComponent],
  imports: [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule, NgZorroAntdModule, HttpClientModule, BrowserAnimationsModule],
  entryComponents: [AdduserComponent, UpdateuserComponent],
  providers: [InterceptorProvider, UserService]
})
export class UserModule {}
