import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LessonMySuffix } from './lesson-my-suffix.model';
import { LessonMySuffixService } from './lesson-my-suffix.service';
@Injectable()
export class LessonMySuffixPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private lessonService: LessonMySuffixService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.lessonService.find(id).subscribe((lesson) => {
                this.lessonModalRef(component, lesson);
            });
        } else {
            return this.lessonModalRef(component, new LessonMySuffix());
        }
    }

    lessonModalRef(component: Component, lesson: LessonMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.lesson = lesson;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
