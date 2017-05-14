import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { TeacherMySuffix } from './teacher-my-suffix.model';
import { TeacherMySuffixPopupService } from './teacher-my-suffix-popup.service';
import { TeacherMySuffixService } from './teacher-my-suffix.service';
import { User, UserService } from '../../shared';
import { FormMySuffix, FormMySuffixService } from '../form';
import { LessonMySuffix, LessonMySuffixService } from '../lesson';
import { SchoolMySuffix, SchoolMySuffixService } from '../school';

@Component({
    selector: 'jhi-teacher-my-suffix-dialog',
    templateUrl: './teacher-my-suffix-dialog.component.html'
})
export class TeacherMySuffixDialogComponent implements OnInit {

    teacher: TeacherMySuffix;
    authorities: any[];
    isSaving: boolean;

    users: User[];

    forms: FormMySuffix[];

    lessons: LessonMySuffix[];

    schools: SchoolMySuffix[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private teacherService: TeacherMySuffixService,
        private userService: UserService,
        private formService: FormMySuffixService,
        private lessonService: LessonMySuffixService,
        private schoolService: SchoolMySuffixService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['teacher']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.userService.query().subscribe(
            (res: Response) => { this.users = res.json(); }, (res: Response) => this.onError(res.json()));
        this.formService.query({filter: 'teacher-is-null'}).subscribe((res: Response) => {
            if (!this.teacher.formId) {
                this.forms = res.json();
            } else {
                this.formService.find(this.teacher.formId).subscribe((subRes: FormMySuffix) => {
                    this.forms = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
        this.lessonService.query().subscribe(
            (res: Response) => { this.lessons = res.json(); }, (res: Response) => this.onError(res.json()));
        this.schoolService.query().subscribe(
            (res: Response) => { this.schools = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.teacher.id !== undefined) {
            this.teacherService.update(this.teacher)
                .subscribe((res: TeacherMySuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.teacherService.create(this.teacher)
                .subscribe((res: TeacherMySuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: TeacherMySuffix) {
        this.eventManager.broadcast({ name: 'teacherListModification', content: 'OK'});
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

    trackLessonById(index: number, item: LessonMySuffix) {
        return item.id;
    }

    trackSchoolById(index: number, item: SchoolMySuffix) {
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
    selector: 'jhi-teacher-my-suffix-popup',
    template: ''
})
export class TeacherMySuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private teacherPopupService: TeacherMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.teacherPopupService
                    .open(TeacherMySuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.teacherPopupService
                    .open(TeacherMySuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
