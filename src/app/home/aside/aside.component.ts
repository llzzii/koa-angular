import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, EMPTY as empty } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { CommonService } from "../../service/common.service";
import { NzIconModule } from "ng-zorro-antd";
@Component({
  selector: "app-aside",
  templateUrl: "./aside.component.html",
  styleUrls: ["./aside.component.css"]
})
export class AsideComponent implements OnInit {
  constructor(private http: HttpClient, private commonService: CommonService) {}

  asideLists: any;
  asideData: Object;
  label: any;
  mode = false;
  dark = false;
  ngOnInit() {
    this.loadAside();
  }
  loadAside() {
    this.getNavAside().subscribe(data => {
      this.asideData = data;
      this.label = data.label;
      this.asideLists = data.sideLists;
    });
  }

  getNavAside(): Observable<any> {
    return this.http.get("assets/data/nav-aside.json").pipe(
      tap(response => response),
      catchError(this.handleError())
    );
  }
  private handleError() {
    return (error: any): Observable<any> => {
      this.commonService.error(error);
      return empty;
    };
  }
}
