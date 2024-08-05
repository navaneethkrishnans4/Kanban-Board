import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private breakpointObserver = inject(BreakpointObserver);
  isFolderOpen: boolean = false;

  constructor(public authService:AuthService,private router:Router){}
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

   
    onLogOut(){
      this.router.navigate(["login"]);
    }
      
  toggleFolder() {
    this.isFolderOpen = !this.isFolderOpen;
  }
}
