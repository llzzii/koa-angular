import { Injectable } from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}
  token = localStorage.getItem("token");
  debugger;
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let url = req.url;
    let authReq;
    let authToken = sessionStorage.getItem("token");
    let attributes = sessionStorage.getItem("token") || "1";
    if (authToken == null) {
      authToken = "1";
    }

    if (url.indexOf("/token") > -1) {
      authReq = req.clone({
        setHeaders: {
          Authorization: "bearer " + authToken
        },
        url: url
      });
    } else {
      authReq = req.clone({
        setHeaders: {
          Attributes: attributes,
          Authorization: "bearer " + authToken
        },
        url: url
        /*withCredentials: true*/
      });
    }

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
