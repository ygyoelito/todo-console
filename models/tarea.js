const {v4: uuidv4} = require ('uuid');

class Tarea {
    id = '';
    desc = '';
    comletadoEn = null;

    constructor(desc) {
        this.id = uuidv4();
        this.desc = desc;  
        this.comletadoEn = null 
    }
}

module.exports = Tarea;