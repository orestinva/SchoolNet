import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { AttendancesMySuffix } from './attendances-my-suffix.model';
import { AttendancesMySuffixPopupService } from './attendances-my-suffix-popup.service';
import { AttendancesMySuffixService } from './attendances-my-suffix.service';
import { PupilMySuffix, PupilMySuffixService } from '../pupil';
import { ScheduleMySuffix, ScheduleMySuffixService } from '../schedule';

@Component({
    selector: 'jhi-attendances-my-suffix-dialog',
    templateUrl: './attendances-my-suffix-dialog.component.html'
})
export class AttendancesMySuffixDialogComponent implements OnInit {

    attendances: AttendancesMySuffix;
    authorities: any[];
    isSaving: boolean;

    pupils: PupilMySuffix[];

    schedules: ScheduleMySuffix[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private attendancesService: AttendancesMySuffixService,
        private pupilService: PupilMySuffixService,
        private scheduleService: ScheduleMySuffixService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['attendances']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.pupilService.query().subscribe(
            (res: Response) => { this.pupils = res.json(); }, (res: Response) => this.onError(res.json()));
        this.scheduleService.query().subscribe(
            (res: Response) => { this.schedules = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.attendances.id !== undefined) {
            this.attendancesService.update(this.attendances)
                .subscribe((res: AttendancesMySuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.attendancesService.create(this.attendances)
                .subscribe((res: AttendancesMySuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: AttendancesMySuffix) {
        this.eventManager.broadcast({ name: 'attendancesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackPupilById(index: number, item: PupilMySuffix) {
        return item.id;
    }

    trackScheduleById(index: number, item: ScheduleMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-attendances-my-suffix-popup',
    template: ''
})
export class AttendancesMySuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private attendancesPopupService: AttendancesMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.attendancesPopupService
                    .open(AttendancesMySuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.attendancesPopupService
                    .open(AttendancesMySuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
