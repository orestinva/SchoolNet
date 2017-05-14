import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { SchoolNetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SchoolMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/school/school-my-suffix-detail.component';
import { SchoolMySuffixService } from '../../../../../../main/webapp/app/entities/school/school-my-suffix.service';
import { SchoolMySuffix } from '../../../../../../main/webapp/app/entities/school/school-my-suffix.model';

describe('Component Tests', () => {

    describe('SchoolMySuffix Management Detail Component', () => {
        let comp: SchoolMySuffixDetailComponent;
        let fixture: ComponentFixture<SchoolMySuffixDetailComponent>;
        let service: SchoolMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolNetTestModule],
                declarations: [SchoolMySuffixDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SchoolMySuffixService,
                    EventManager
                ]
            }).overrideComponent(SchoolMySuffixDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SchoolMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SchoolMySuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new SchoolMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.school).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
