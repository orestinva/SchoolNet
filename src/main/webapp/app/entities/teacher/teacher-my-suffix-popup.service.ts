import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TeacherMySuffix } from './teacher-my-suffix.model';
import { TeacherMySuffixService } from './teacher-my-suffix.service';
@Injectable()
export class TeacherMySuffixPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private teacherService: TeacherMySuffixService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.teacherService.find(id).subscribe((teacher) => {
                this.teacherModalRef(component, teacher);
            });
        } else {
            return this.teacherModalRef(component, new TeacherMySuffix());
        }
    }

    teacherModalRef(component: Component, teacher: TeacherMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.teacher = teacher;
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
