import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { PupilMySuffix } from './pupil-my-suffix.model';
import { PupilMySuffixPopupService } from './pupil-my-suffix-popup.service';
import { PupilMySuffixService } from './pupil-my-suffix.service';
import { User, UserService } from '../../shared';
import { FormMySuffix, FormMySuffixService } from '../form';
import { ParentMySuffix, ParentMySuffixService } from '../parent';

@Component({
    selector: 'jhi-pupil-my-suffix-dialog',
    templateUrl: './pupil-my-suffix-dialog.component.html'
})
export class PupilMySuffixDialogComponent implements OnInit {

    pupil: PupilMySuffix;
    authorities: any[];
    isSaving: boolean;

    users: User[];

    forms: FormMySuffix[];

    parents: ParentMySuffix[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private pupilService: PupilMySuffixService,
        private userService: UserService,
        private formService: FormMySuffixService,
        private parentService: ParentMySuffixService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['pupil']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.userService.query().subscribe(
            (res: Response) => { this.users = res.json(); }, (res: Response) => this.onError(res.json()));
        this.formService.query().subscribe(
            (res: Response) => { this.forms = res.json(); }, (res: Response) => this.onError(res.json()));
        this.parentService.query().subscribe(
            (res: Response) => { this.parents = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.pupil.id !== undefined) {
            this.pupilService.update(this.pupil)
                .subscribe((res: PupilMySuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.pupilService.create(this.pupil)
                .subscribe((res: PupilMySuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: PupilMySuffix) {
        this.eventManager.broadcast({ name: 'pupilListModification', content: 'OK'});
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

    trackFormById(index: number, item: FormMySuffix) {
        return item.id;
    }

    trackParentById(index: number, item: ParentMySuffix) {
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
    selector: 'jhi-pupil-my-suffix-popup',
    template: ''
})
export class PupilMySuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pupilPopupService: PupilMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.pupilPopupService
                    .open(PupilMySuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.pupilPopupService
                    .open(PupilMySuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
