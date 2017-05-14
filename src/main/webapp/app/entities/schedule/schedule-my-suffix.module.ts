import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolNetSharedModule } from '../../shared';
import {
    ScheduleMySuffixService,
    ScheduleMySuffixPopupService,
    ScheduleMySuffixComponent,
    ScheduleMySuffixDetailComponent,
    ScheduleMySuffixDialogComponent,
    ScheduleMySuffixPopupComponent,
    ScheduleMySuffixDeletePopupComponent,
    ScheduleMySuffixDeleteDialogComponent,
    scheduleRoute,
    schedulePopupRoute,
} from './';

const ENTITY_STATES = [
    ...scheduleRoute,
    ...schedulePopupRoute,
];

@NgModule({
    imports: [
        SchoolNetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ScheduleMySuffixComponent,
        ScheduleMySuffixDetailComponent,
        ScheduleMySuffixDialogComponent,
        ScheduleMySuffixDeleteDialogComponent,
        ScheduleMySuffixPopupComponent,
        ScheduleMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ScheduleMySuffixComponent,
        ScheduleMySuffixDialogComponent,
        ScheduleMySuffixPopupComponent,
        ScheduleMySuffixDeleteDialogComponent,
        ScheduleMySuffixDeletePopupComponent,
    ],
    providers: [
        ScheduleMySuffixService,
        ScheduleMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolNetScheduleMySuffixModule {}
