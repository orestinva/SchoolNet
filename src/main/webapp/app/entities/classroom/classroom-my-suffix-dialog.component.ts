import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { ClassroomMySuffix } from './classroom-my-suffix.model';
import { ClassroomMySuffixPopupService } from './classroom-my-suffix-popup.service';
import { ClassroomMySuffixService } from './classroom-my-suffix.service';
import { SchoolMySuffix, SchoolMySuffixService } from '../school';

@Component({
    selector: 'jhi-classroom-my-suffix-dialog',
    templateUrl: './classroom-my-suffix-dialog.component.html'
})
export class ClassroomMySuffixDialogComponent implements OnInit {

    classroom: ClassroomMySuffix;
    authorities: any[];
    isSaving: boolean;

    schools: SchoolMySuffix[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private classroomService: ClassroomMySuffixService,
        private schoolService: SchoolMySuffixService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['classroom']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.schoolService.query().subscribe(
            (res: Response) => { this.schools = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.classroom.id !== undefined) {
            this.classroomService.update(this.classroom)
                .subscribe((res: ClassroomMySuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.classroomService.create(this.classroom)
                .subscribe((res: ClassroomMySuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: ClassroomMySuffix) {
        this.eventManager.broadcast({ name: 'classroomListModification', content: 'OK'});
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

    trackSchoolById(index: number, item: SchoolMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-classroom-my-suffix-popup',
    template: ''
})
export class ClassroomMySuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private classroomPopupService: ClassroomMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.classroomPopupService
                    .open(ClassroomMySuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.classroomPopupService
                    .open(ClassroomMySuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
