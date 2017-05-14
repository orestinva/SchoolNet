import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { LessonMySuffix } from './lesson-my-suffix.model';
import { LessonMySuffixService } from './lesson-my-suffix.service';

@Component({
    selector: 'jhi-lesson-my-suffix-detail',
    templateUrl: './lesson-my-suffix-detail.component.html'
})
export class LessonMySuffixDetailComponent implements OnInit, OnDestroy {

    lesson: LessonMySuffix;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private lessonService: LessonMySuffixService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['lesson']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLessons();
    }

    load(id) {
        this.lessonService.find(id).subscribe((lesson) => {
            this.lesson = lesson;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLessons() {
        this.eventSubscriber = this.eventManager.subscribe('lessonListModification', (response) => this.load(this.lesson.id));
    }
}
