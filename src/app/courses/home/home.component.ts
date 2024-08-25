import {Component, OnInit} from '@angular/core';
import {Course, compareCourses} from '../model/course';
import {map, shareReplay} from 'rxjs/operators';

import { CourseEntityService } from '../services/course-entity.service';
import {EditCourseDialogComponent} from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {Observable} from "rxjs";
import {defaultDialogConfig} from '../shared/default-dialog-config';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    promoTotal$: Observable<number>;

    loading$: Observable<boolean>;

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;


    constructor(
      private dialog: MatDialog,
      private coursesService: CourseEntityService) {
// Courses entity service is used in resolver to put the courses into the store, if they are not
// already there, and it also can be used o query the store... hmmm...

    }

    ngOnInit() {
      this.reload();
    }

  reload() {

    this.beginnerCourses$ =  this.coursesService.entities$
      .pipe(
        map(courses => courses.filter(course => course.category == 'BEGINNER'))
      );

    this.advancedCourses$ =  this.coursesService.entities$
      .pipe(
        map(courses => courses.filter(course => course.category == 'ADVANCED'))
      );

    this.promoTotal$ =  this.coursesService.entities$
        .pipe(
            map(courses => courses.filter(course => course.promo).length)
        );

  }

  onAddCourse() {

    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle:"Create Course",
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);

  }


}
