'use strict'

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { CourseEntityService } from "./course-entity.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class CoursesResolver implements Resolve<boolean> {

  constructor(private coursesService: CourseEntityService) {}

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>  {

      return this.coursesService.getAll()
      .pipe(map(courses => !!courses));  // bang  bang convert course to a boolean for the return type observable boolean

  }

}
