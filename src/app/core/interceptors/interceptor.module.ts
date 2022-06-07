import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpBasicInterceptor } from './http-basic-interceptor.service';


@NgModule({
    providers: [
        HttpBasicInterceptor,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpBasicInterceptor,
            multi: true
        }
    ],
})
export class InterceptorModule { }
