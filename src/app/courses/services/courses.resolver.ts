'use strict'

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { filter, first, map, tap } from "rxjs/operators";

import { CourseEntityService } from "./course-entity.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class CoursesResolver implements Resolve<boolean> {

  constructor(private coursesService: CourseEntityService) {}

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>  {

      return this.coursesService.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            return this.coursesService.getAll();
          }
        }),
        filter(loaded => !!loaded),  // ensures we wait for the data to be loaded...
        first() // complete the observable.
      );
       // bang  bang convert course to a boolean for the return type observable boolean

  }

}
