export class Patron {
    constructor(
        public id: number | null,
        public firstName: string,
        public lastName: string,
        public userName: string,
        public emailAddress: string | null
    ){}
}
