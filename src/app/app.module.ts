import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { RepositoryTableComponent } from './repository-table/repository-table.component';

@NgModule({
    declarations: [AppComponent, RepositoryTableComponent],
    imports: [BrowserModule, CoreModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
