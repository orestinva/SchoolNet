export class ScheduleMySuffix {
    constructor(
        public id?: number,
        public date?: any,
        public homework?: string,
        public lessonPosition?: number,
        public enabled?: boolean,
        public attendancesId?: number,
        public lessonId?: number,
        public formId?: number,
        public classroomId?: number,
    ) {
        this.enabled = false;
    }
}
