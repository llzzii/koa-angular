import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable, throwError as observableThrowError } from "rxjs";
import { tap } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ "Content-type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}
  getUserList(): Observable<any> {
    return this.http.get("/api/userlist").pipe(tap(response => response));
  }
  createUser(data): Observable<any> {
    return this.http.post("/api/create", JSON.stringify(data), httpOptions).pipe(tap(response => response));
  }
  updateUser(data): Observable<any> {
    return this.http.put("/api/update", JSON.stringify(data), httpOptions).pipe(tap(response => response));
  }
  refreshPassword(data): Observable<any> {
    return this.http.put("/api/updatePassword", JSON.stringify(data), httpOptions).pipe(tap(response => response));
  }
  deleteUser(data): Observable<any> {
    let userParams = new HttpParams().append("userid", data);
    return this.http.delete("/api/delete", { params: userParams }).pipe(tap(response => response));
  }
}
