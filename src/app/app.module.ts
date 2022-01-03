import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './store/reducers';
import { AppFacade } from './app.facade';
import { FilterInputComponent } from './components/filter-input/filter-input.component';

@NgModule({
  declarations: [AppComponent, FilterInputComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('app', reducers),
    AppRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    FileUploadModule,
    SidebarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [AppFacade],
  bootstrap: [AppComponent],
})
export class AppModule {}
