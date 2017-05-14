import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { PupilMySuffix } from './pupil-my-suffix.model';
import { PupilMySuffixService } from './pupil-my-suffix.service';

@Component({
    selector: 'jhi-pupil-my-suffix-detail',
    templateUrl: './pupil-my-suffix-detail.component.html'
})
export class PupilMySuffixDetailComponent implements OnInit, OnDestroy {

    pupil: PupilMySuffix;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private pupilService: PupilMySuffixService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['pupil']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPupils();
    }

    load(id) {
        this.pupilService.find(id).subscribe((pupil) => {
            this.pupil = pupil;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPupils() {
        this.eventSubscriber = this.eventManager.subscribe('pupilListModification', (response) => this.load(this.pupil.id));
    }
}
