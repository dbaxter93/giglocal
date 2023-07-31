export class Gig {
    constructor(
        public id: number | null,
        public title: string,
        public description: string,
        public callFor: string,
        public date: string,
        public postedOn: Date,
        public address: string,
        public isActive: boolean
    ){}
}
