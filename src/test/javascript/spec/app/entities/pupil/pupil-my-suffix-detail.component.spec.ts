import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { SchoolNetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PupilMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/pupil/pupil-my-suffix-detail.component';
import { PupilMySuffixService } from '../../../../../../main/webapp/app/entities/pupil/pupil-my-suffix.service';
import { PupilMySuffix } from '../../../../../../main/webapp/app/entities/pupil/pupil-my-suffix.model';

describe('Component Tests', () => {

    describe('PupilMySuffix Management Detail Component', () => {
        let comp: PupilMySuffixDetailComponent;
        let fixture: ComponentFixture<PupilMySuffixDetailComponent>;
        let service: PupilMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolNetTestModule],
                declarations: [PupilMySuffixDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PupilMySuffixService,
                    EventManager
                ]
            }).overrideComponent(PupilMySuffixDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PupilMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PupilMySuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PupilMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.pupil).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
