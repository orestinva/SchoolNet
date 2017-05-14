export class TeacherMySuffix {
    constructor(
        public id?: number,
        public enabled?: boolean,
        public userId?: number,
        public formId?: number,
        public lessonId?: number,
        public schoolId?: number,
    ) {
        this.enabled = false;
    }
}
