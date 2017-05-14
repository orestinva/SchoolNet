import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { LessonMySuffix } from './lesson-my-suffix.model';
import { LessonMySuffixPopupService } from './lesson-my-suffix-popup.service';
import { LessonMySuffixService } from './lesson-my-suffix.service';

@Component({
    selector: 'jhi-lesson-my-suffix-delete-dialog',
    templateUrl: './lesson-my-suffix-delete-dialog.component.html'
})
export class LessonMySuffixDeleteDialogComponent {

    lesson: LessonMySuffix;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private lessonService: LessonMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['lesson']);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.lessonService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'lessonListModification',
                content: 'Deleted an lesson'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-lesson-my-suffix-delete-popup',
    template: ''
})
export class LessonMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lessonPopupService: LessonMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.lessonPopupService
                .open(LessonMySuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
