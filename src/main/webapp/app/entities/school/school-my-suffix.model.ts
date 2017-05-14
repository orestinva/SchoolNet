export class SchoolMySuffix {
    constructor(
        public id?: number,
        public name?: string,
        public enabled?: boolean,
        public classroomId?: number,
        public formId?: number,
        public teacherId?: number,
    ) {
        this.enabled = false;
    }
}
