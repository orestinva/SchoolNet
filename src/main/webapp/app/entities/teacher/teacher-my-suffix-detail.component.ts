import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { TeacherMySuffix } from './teacher-my-suffix.model';
import { TeacherMySuffixService } from './teacher-my-suffix.service';

@Component({
    selector: 'jhi-teacher-my-suffix-detail',
    templateUrl: './teacher-my-suffix-detail.component.html'
})
export class TeacherMySuffixDetailComponent implements OnInit, OnDestroy {

    teacher: TeacherMySuffix;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private teacherService: TeacherMySuffixService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['teacher']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTeachers();
    }

    load(id) {
        this.teacherService.find(id).subscribe((teacher) => {
            this.teacher = teacher;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTeachers() {
        this.eventSubscriber = this.eventManager.subscribe('teacherListModification', (response) => this.load(this.teacher.id));
    }
}
