import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolNetSharedModule } from '../../shared';
import {
    FormMySuffixService,
    FormMySuffixPopupService,
    FormMySuffixComponent,
    FormMySuffixDetailComponent,
    FormMySuffixDialogComponent,
    FormMySuffixPopupComponent,
    FormMySuffixDeletePopupComponent,
    FormMySuffixDeleteDialogComponent,
    formRoute,
    formPopupRoute,
} from './';

const ENTITY_STATES = [
    ...formRoute,
    ...formPopupRoute,
];

@NgModule({
    imports: [
        SchoolNetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        FormMySuffixComponent,
        FormMySuffixDetailComponent,
        FormMySuffixDialogComponent,
        FormMySuffixDeleteDialogComponent,
        FormMySuffixPopupComponent,
        FormMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        FormMySuffixComponent,
        FormMySuffixDialogComponent,
        FormMySuffixPopupComponent,
        FormMySuffixDeleteDialogComponent,
        FormMySuffixDeletePopupComponent,
    ],
    providers: [
        FormMySuffixService,
        FormMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolNetFormMySuffixModule {}
