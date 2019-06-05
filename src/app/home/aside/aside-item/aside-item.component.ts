import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-aside-item",
  templateUrl: "./aside-item.component.html",
  styleUrls: ["./aside-item.component.css"]
})
export class AsideItemComponent implements OnInit {
  constructor() {}
  @Input() sideList: any;

  ngOnInit() {}
}
