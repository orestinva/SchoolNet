export class PupilMySuffix {
    constructor(
        public id?: number,
        public enabled?: boolean,
        public userId?: number,
        public attendancesId?: number,
        public formId?: number,
        public parentId?: number,
    ) {
        this.enabled = false;
    }
}
