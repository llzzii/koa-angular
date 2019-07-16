import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";

import { HomeComponent } from "./home/home.component";
import { NgZorroAntdModule, NZ_I18N, zh_CN } from "ng-zorro-antd";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { registerLocaleData } from "@angular/common";
import zh from "@angular/common/locales/zh";
import { HomeModule } from "./home/home.module";
import { UserModule } from "./manage/manage.module";
import { NewsModule } from "./news/news.module";
import { RoleListComponent } from './manage/role/role-list/role-list.component';
import { DeptListComponent } from './manage/department/dept-list/dept-list.component';

registerLocaleData(zh);

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, RoleListComponent, DeptListComponent],
  imports: [
    HomeModule,
    NewsModule,
    UserModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule {}
