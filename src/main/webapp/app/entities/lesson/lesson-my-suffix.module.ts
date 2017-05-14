import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolNetSharedModule } from '../../shared';
import {
    LessonMySuffixService,
    LessonMySuffixPopupService,
    LessonMySuffixComponent,
    LessonMySuffixDetailComponent,
    LessonMySuffixDialogComponent,
    LessonMySuffixPopupComponent,
    LessonMySuffixDeletePopupComponent,
    LessonMySuffixDeleteDialogComponent,
    lessonRoute,
    lessonPopupRoute,
} from './';

const ENTITY_STATES = [
    ...lessonRoute,
    ...lessonPopupRoute,
];

@NgModule({
    imports: [
        SchoolNetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        LessonMySuffixComponent,
        LessonMySuffixDetailComponent,
        LessonMySuffixDialogComponent,
        LessonMySuffixDeleteDialogComponent,
        LessonMySuffixPopupComponent,
        LessonMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        LessonMySuffixComponent,
        LessonMySuffixDialogComponent,
        LessonMySuffixPopupComponent,
        LessonMySuffixDeleteDialogComponent,
        LessonMySuffixDeletePopupComponent,
    ],
    providers: [
        LessonMySuffixService,
        LessonMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolNetLessonMySuffixModule {}
