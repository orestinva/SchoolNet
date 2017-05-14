import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { SchoolNetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ClassroomMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/classroom/classroom-my-suffix-detail.component';
import { ClassroomMySuffixService } from '../../../../../../main/webapp/app/entities/classroom/classroom-my-suffix.service';
import { ClassroomMySuffix } from '../../../../../../main/webapp/app/entities/classroom/classroom-my-suffix.model';

describe('Component Tests', () => {

    describe('ClassroomMySuffix Management Detail Component', () => {
        let comp: ClassroomMySuffixDetailComponent;
        let fixture: ComponentFixture<ClassroomMySuffixDetailComponent>;
        let service: ClassroomMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolNetTestModule],
                declarations: [ClassroomMySuffixDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ClassroomMySuffixService,
                    EventManager
                ]
            }).overrideComponent(ClassroomMySuffixDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClassroomMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClassroomMySuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ClassroomMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.classroom).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
