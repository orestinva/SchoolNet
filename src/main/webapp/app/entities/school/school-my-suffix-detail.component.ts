import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { SchoolMySuffix } from './school-my-suffix.model';
import { SchoolMySuffixService } from './school-my-suffix.service';

@Component({
    selector: 'jhi-school-my-suffix-detail',
    templateUrl: './school-my-suffix-detail.component.html'
})
export class SchoolMySuffixDetailComponent implements OnInit, OnDestroy {

    school: SchoolMySuffix;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private schoolService: SchoolMySuffixService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['school']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSchools();
    }

    load(id) {
        this.schoolService.find(id).subscribe((school) => {
            this.school = school;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSchools() {
        this.eventSubscriber = this.eventManager.subscribe('schoolListModification', (response) => this.load(this.school.id));
    }
}
