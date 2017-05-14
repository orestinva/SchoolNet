import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { SchoolNetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ParentMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/parent/parent-my-suffix-detail.component';
import { ParentMySuffixService } from '../../../../../../main/webapp/app/entities/parent/parent-my-suffix.service';
import { ParentMySuffix } from '../../../../../../main/webapp/app/entities/parent/parent-my-suffix.model';

describe('Component Tests', () => {

    describe('ParentMySuffix Management Detail Component', () => {
        let comp: ParentMySuffixDetailComponent;
        let fixture: ComponentFixture<ParentMySuffixDetailComponent>;
        let service: ParentMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolNetTestModule],
                declarations: [ParentMySuffixDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ParentMySuffixService,
                    EventManager
                ]
            }).overrideComponent(ParentMySuffixDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ParentMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParentMySuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ParentMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.parent).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
