import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ICanDeactivate } from '../models/ican-deactivate';

@Injectable({
    providedIn: 'root'
})
export class CanDeactivateGuard
    implements CanDeactivate<ICanDeactivate> {

    canDeactivate(
        component: ICanDeactivate,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean | UrlTree {

        return component.canDeactivate();
    }
}