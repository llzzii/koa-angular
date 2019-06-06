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

import { NewslistComponent } from "./newslist/newslist.component";
import { AddnewsComponent } from "./addnews/addnews.component";
import { UpdatenewsComponent } from "./updatenews/updatenews.component";

@NgModule({
  declarations: [NewslistComponent, AddnewsComponent, UpdatenewsComponent],
  imports: [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule, NgZorroAntdModule, HttpClientModule, BrowserAnimationsModule]
})
export class NewsModule {}
