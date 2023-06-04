interface _Task {
    _id?: string;
    title: string;
    description: string;
    status: string;
}

export class Task {

    constructor(
        public title: string,
        public description: string,
        public status: string,
        public id?: string,
    ) {}

}

