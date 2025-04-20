import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  imports: [FormsModule, HttpClientModule, BrowserModule, RouterModule, AppRoutingModule],
  declarations: [
    AppComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, 
      useClass: JwtInterceptor, 
      multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
