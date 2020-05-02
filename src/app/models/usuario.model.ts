export class  Usuario {

    constructor (
        public nombre: string,
        public email:string,
        public password: string,
        public img?: string, // ? para ponerlo como opcional. Si pongo este aquí, a partir de este, los de abajo 
        public role?: string, // a fuerza tienen que ser opcionales
        public google?: boolean,
        public _id?:string
     ) {


    }
}

//  creamos un modelo de datos que sea igual al de la DDBB 