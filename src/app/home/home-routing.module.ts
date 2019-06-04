import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WorkComponent } from "./work/work.component";
import { HomeComponent } from "./home.component";
import { UserlistComponent } from "../user/userlist/userlist.component";
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
        path: "user",
        component: UserlistComponent
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
