import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ClassroomMySuffix } from './classroom-my-suffix.model';
import { ClassroomMySuffixService } from './classroom-my-suffix.service';
@Injectable()
export class ClassroomMySuffixPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private classroomService: ClassroomMySuffixService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.classroomService.find(id).subscribe((classroom) => {
                this.classroomModalRef(component, classroom);
            });
        } else {
            return this.classroomModalRef(component, new ClassroomMySuffix());
        }
    }

    classroomModalRef(component: Component, classroom: ClassroomMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.classroom = classroom;
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
