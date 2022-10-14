import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AppService } from '../service/app.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AppService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isLoggedIn        
      .pipe(
        take(1),                              
        map((isLoggedIn: boolean) => {         
          if (!isLoggedIn){
            this.router.navigate(['/login']);  
            return false;
          }
          return true;
        })
      )
  }
}