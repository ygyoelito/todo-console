//require('colors');
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  MostrarListadoChecklist,
} = require("./helpers/inquirer");
const { guardarDatos, leerDatos } = require("./helpers/saveFiles");
const Tareas = require("./models/tareas");

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDb = leerDatos();
  if (tareasDb) {
    //cargar tareas
    tareas.cargarTareasFromArray(tareasDb);
  }

  do {
    //imprime el menú de la aplicación
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        // crear tarea
        const desc = await leerInput("Description:");
        tareas.crearTarea(desc);
        break;
      case "2":
        // listar tarea
        tareas.listadoCompleto();
        break;
      case "3":
        // listar tarea completadas
        tareas.listarPendientesCompletadas(true);
        break;
      case "4":
        // listar tarea pendientes
        tareas.listarPendientesCompletadas(false);
        break;
      case "5":
        // Completado | Pendiente
        const ids = await MostrarListadoChecklist(tareas.listadoArr)
        tareas.toggleCompletadas(ids);
        break;
      case "6":
        // borrar tareas
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirmar("Are you sure?");
          if (ok) {
            tareas.borrarTareas(id);
            console.log("Task deleted!");
          }
        }
        break;
    }

    guardarDatos(tareas.listadoArr);
    await pausa();
  } while (opt !== "0");
};

main();
