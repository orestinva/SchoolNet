export class FormMySuffix {
    constructor(
        public id?: number,
        public name?: string,
        public enabled?: boolean,
        public pupilId?: number,
        public scheduleId?: number,
        public schoolId?: number,
    ) {
        this.enabled = false;
    }
}
