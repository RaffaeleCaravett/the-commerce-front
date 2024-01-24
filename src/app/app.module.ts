import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CercaComponent } from './components/cerca/cerca.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ViewProdottoComponent } from './shared/view-prodotto/view-prodotto.component';
import { ErrorComponent } from './shared/error/error.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { CommerceStatsComponent } from './components/commerce-stats/commerce-stats.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './core/guard/auth.guard';
import { TokenInterceptor } from './core/interceptor/token.interceptor';
import { ShowProductsComponent } from './shared/show-products/show-products.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CercaComponent,
    NavbarComponent,
    FooterComponent,
    ViewProdottoComponent,
    ErrorComponent,
    NotFoundComponent,
    CommerceStatsComponent,
    ShowProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    HttpClientModule
  ],
  providers: [AuthGuard,
    provideAnimations(),
    provideToastr(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
