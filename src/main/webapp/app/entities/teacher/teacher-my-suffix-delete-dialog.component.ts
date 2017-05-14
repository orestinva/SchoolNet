import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { TeacherMySuffix } from './teacher-my-suffix.model';
import { TeacherMySuffixPopupService } from './teacher-my-suffix-popup.service';
import { TeacherMySuffixService } from './teacher-my-suffix.service';

@Component({
    selector: 'jhi-teacher-my-suffix-delete-dialog',
    templateUrl: './teacher-my-suffix-delete-dialog.component.html'
})
export class TeacherMySuffixDeleteDialogComponent {

    teacher: TeacherMySuffix;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private teacherService: TeacherMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['teacher']);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.teacherService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'teacherListModification',
                content: 'Deleted an teacher'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-teacher-my-suffix-delete-popup',
    template: ''
})
export class TeacherMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private teacherPopupService: TeacherMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.teacherPopupService
                .open(TeacherMySuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
