export class Pokemon {
    constructor(
        public id: number,
        public  name: string,
        public  type1: string,
        public  type2: string,
        public  description: string,
        private weight: number,
        private height: number
    ) {}
}
