import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { AttendancesMySuffix } from './attendances-my-suffix.model';
import { AttendancesMySuffixService } from './attendances-my-suffix.service';

@Component({
    selector: 'jhi-attendances-my-suffix-detail',
    templateUrl: './attendances-my-suffix-detail.component.html'
})
export class AttendancesMySuffixDetailComponent implements OnInit, OnDestroy {

    attendances: AttendancesMySuffix;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private attendancesService: AttendancesMySuffixService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['attendances']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAttendances();
    }

    load(id) {
        this.attendancesService.find(id).subscribe((attendances) => {
            this.attendances = attendances;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAttendances() {
        this.eventSubscriber = this.eventManager.subscribe('attendancesListModification', (response) => this.load(this.attendances.id));
    }
}
