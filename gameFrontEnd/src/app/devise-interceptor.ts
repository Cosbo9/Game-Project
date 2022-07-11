import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DeviseInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const USER_TOKEN = localStorage.getItem("token")

    if (USER_TOKEN != null && USER_TOKEN.length > 26) {
        request = request.clone({
            setHeaders: { Authorization: USER_TOKEN }
        });

    }

    return next.handle(request);
  }
}
