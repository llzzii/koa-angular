import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgZorroAntdModule, NZ_I18N, zh_CN } from "ng-zorro-antd";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomeRoutingModule } from "./home-routing.module";
import { AsideComponent } from "./aside/aside.component";
import { HeaderComponent } from "./header/header.component";
import { AsideItemComponent } from "./aside/aside-item/aside-item.component";
import { WorkComponent } from "./work/work.component";
import { ContentComponent } from "./content/content.component";

@NgModule({
  declarations: [AsideComponent, HeaderComponent, AsideItemComponent, WorkComponent, ContentComponent],
  imports: [CommonModule, NgZorroAntdModule, HomeRoutingModule, BrowserModule, BrowserAnimationsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  exports: [AsideComponent, HeaderComponent, AsideItemComponent, ContentComponent]
})
export class HomeModule {}
