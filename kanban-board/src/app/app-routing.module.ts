import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginContainerComponent } from './login-container/login-container.component';
import { BoardContainerComponent } from './board-container/board-container.component';
import { AuthGuard } from './service/auth-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginContainerComponent },
  { path: 'board', component: BoardContainerComponent,canActivate: [AuthGuard]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
