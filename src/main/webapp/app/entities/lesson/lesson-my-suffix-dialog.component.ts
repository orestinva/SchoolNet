import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { LessonMySuffix } from './lesson-my-suffix.model';
import { LessonMySuffixPopupService } from './lesson-my-suffix-popup.service';
import { LessonMySuffixService } from './lesson-my-suffix.service';
import { TeacherMySuffix, TeacherMySuffixService } from '../teacher';

@Component({
    selector: 'jhi-lesson-my-suffix-dialog',
    templateUrl: './lesson-my-suffix-dialog.component.html'
})
export class LessonMySuffixDialogComponent implements OnInit {

    lesson: LessonMySuffix;
    authorities: any[];
    isSaving: boolean;

    teachers: TeacherMySuffix[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private lessonService: LessonMySuffixService,
        private teacherService: TeacherMySuffixService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['lesson']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.teacherService.query().subscribe(
            (res: Response) => { this.teachers = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.lesson.id !== undefined) {
            this.lessonService.update(this.lesson)
                .subscribe((res: LessonMySuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.lessonService.create(this.lesson)
                .subscribe((res: LessonMySuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: LessonMySuffix) {
        this.eventManager.broadcast({ name: 'lessonListModification', content: 'OK'});
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

    trackTeacherById(index: number, item: TeacherMySuffix) {
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
    selector: 'jhi-lesson-my-suffix-popup',
    template: ''
})
export class LessonMySuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lessonPopupService: LessonMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.lessonPopupService
                    .open(LessonMySuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.lessonPopupService
                    .open(LessonMySuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
