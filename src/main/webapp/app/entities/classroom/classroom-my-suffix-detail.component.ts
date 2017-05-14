import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { ClassroomMySuffix } from './classroom-my-suffix.model';
import { ClassroomMySuffixService } from './classroom-my-suffix.service';

@Component({
    selector: 'jhi-classroom-my-suffix-detail',
    templateUrl: './classroom-my-suffix-detail.component.html'
})
export class ClassroomMySuffixDetailComponent implements OnInit, OnDestroy {

    classroom: ClassroomMySuffix;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private classroomService: ClassroomMySuffixService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['classroom']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInClassrooms();
    }

    load(id) {
        this.classroomService.find(id).subscribe((classroom) => {
            this.classroom = classroom;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInClassrooms() {
        this.eventSubscriber = this.eventManager.subscribe('classroomListModification', (response) => this.load(this.classroom.id));
    }
}
