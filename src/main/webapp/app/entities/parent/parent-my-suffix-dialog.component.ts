import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { ParentMySuffix } from './parent-my-suffix.model';
import { ParentMySuffixPopupService } from './parent-my-suffix-popup.service';
import { ParentMySuffixService } from './parent-my-suffix.service';
import { User, UserService } from '../../shared';
import { PupilMySuffix, PupilMySuffixService } from '../pupil';

@Component({
    selector: 'jhi-parent-my-suffix-dialog',
    templateUrl: './parent-my-suffix-dialog.component.html'
})
export class ParentMySuffixDialogComponent implements OnInit {

    parent: ParentMySuffix;
    authorities: any[];
    isSaving: boolean;

    users: User[];

    pupils: PupilMySuffix[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private parentService: ParentMySuffixService,
        private userService: UserService,
        private pupilService: PupilMySuffixService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['parent']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.userService.query().subscribe(
            (res: Response) => { this.users = res.json(); }, (res: Response) => this.onError(res.json()));
        this.pupilService.query().subscribe(
            (res: Response) => { this.pupils = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.parent.id !== undefined) {
            this.parentService.update(this.parent)
                .subscribe((res: ParentMySuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.parentService.create(this.parent)
                .subscribe((res: ParentMySuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: ParentMySuffix) {
        this.eventManager.broadcast({ name: 'parentListModification', content: 'OK'});
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

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackPupilById(index: number, item: PupilMySuffix) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-parent-my-suffix-popup',
    template: ''
})
export class ParentMySuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private parentPopupService: ParentMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.parentPopupService
                    .open(ParentMySuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.parentPopupService
                    .open(ParentMySuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
