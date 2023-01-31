require("colors");
const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  constructor() {
    this._listado = {};
  }

  borrarTareas (id = '') {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((task) => {
      this._listado[task.id] = task;
    });
  }

  get listadoArr() {
    const resultado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      resultado.push(tarea);
    });

    return resultado;
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    let result = "";
    console.log();
    this.listadoArr.forEach((item, pos) => {
      item.comletadoEn
        ? (result += console.log(
            `${(pos + 1 + ".").green} ${item.desc + " ::"} ${
              "Completed".green
            }`
          ))
        : (result += console.log(
            `${(pos + 1 + ".").red} ${item.desc + " ::"} ${"Pending".red}`
          ));
    });
    return result;
  }

  listarPendientesCompletadas(completadas = true) {
    let result = "";
    let ind = 1;
    console.log();
    this.listadoArr.forEach( item => {
      if (completadas) {
        if (item.comletadoEn) {
          result += console.log(
            `${(ind.toString() + ".").green} ${item.desc + " ::"} ${
              ("Completed on " + item.comletadoEn).green
            }`
          );
          ind++;
        }
      } else {
        if (!item.comletadoEn) {
          result += console.log(
            `${(ind.toString() + ".").red} ${item.desc + " ::"} ${"Pending".red}`
          );
          ind++;
        }
      }
    });
    return result == "" ? console.log("No Tasks with such criteria".yellow) : result;
  }

  toggleCompletadas (ids = []) {
    ids.forEach (id => {
      const tarea = this._listado[id];

      if (!tarea.comletadoEn){
        tarea.comletadoEn = new Date().toISOString()
      }

    });

    this.listadoArr.forEach (tarea => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].comletadoEn = null;
      }
    })

  }

}

module.exports = Tareas;
