import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WorkComponent } from "./work/work.component";
import { HomeComponent } from "./home.component";
import { UserlistComponent } from "../manage/user/userlist/userlist.component";
import { RoleListComponent } from "../manage/role/role-list/role-list.component";
import { DeptListComponent } from "../manage/department/dept-list/dept-list.component";
const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    children: [
      {
        path: "",
        component: WorkComponent
      },
      {
        path: "dept",
        component: DeptListComponent
      },
      {
        path: "role",
        component: RoleListComponent
      },
      {
        path: "user",
        component: UserlistComponent
      },
      {
        path: "work",
        component: WorkComponent
      }
    ]
  }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
