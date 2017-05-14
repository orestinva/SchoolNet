export class LessonMySuffix {
    constructor(
        public id?: number,
        public name?: string,
        public enabled?: boolean,
        public scheduleId?: number,
        public teacherId?: number,
    ) {
        this.enabled = false;
    }
}
