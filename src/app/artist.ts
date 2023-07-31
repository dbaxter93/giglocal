export class Artist {
    constructor(
        public id: number | null,
        public firstName: string,
        public lastName: string,
        public userName: string,
        public emailAddress: string | null,
        public instrument: string | null
    ){}
}
