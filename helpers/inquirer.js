const { green } = require('colors');
const inquirer = require('inquirer');
require('colors');

const preguntas = {
    type: 'list',
    name: 'opt_choice',
    message: 'What do you want to do?',
    choices: [
        {
            value: '1',
            name: `${"1:".yellow} Create Task`,             
        },
        {
            value: '2',
            name: `${"2:".yellow} List Task`, 
        },
        {
            value: '3',
            name: `${"3:".yellow} List Completed Tasks`, 
        },
        {
            value: '4',
            name: `${"4:".yellow} List Pending Task`, 
        },
        {
            value: '5',
            name: `${"5:".yellow} Complete Task(s)`, 
        },
        {
            value: '6',
            name: `${"6:".yellow} Delete Task`, 
        },
        {
            value: '0',
            name: `${"0: Exit".red}`, 
        }
    ]
}

const inquirerMenu = async () => {
    console.clear();
    console.log("==========================".green);
    console.log("     Select an Option     ".white);
    console.log("==========================\n".green);

    const { opt_choice } = await inquirer.prompt(preguntas)
    return opt_choice;
}

const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'ENTER'.green} to continue`
        }        
    ];
    console.log('\n');
    await inquirer.prompt(question);
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Please enter a value'.red;
                }
                return true;
            }
        }
    ];
    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async (tareas = []) => {

    const choices = tareas.map( (tarea, i) => {
        const idx = `${i+1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }

    });

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancel'
    })

    const listadoEliminar = {
        type: 'list',
        name: 'id',
        message: 'Select the Task to be Deleted',
        choices
    }
    
    const {id} = await inquirer.prompt(listadoEliminar);
    return id;    
}

const confirmar = async (message) => {
    const pregunta = [{
        type: 'confirm',
        name: 'ok',
        message
    }]
    const {ok} = await inquirer.prompt(pregunta);
    return ok; 
}

const MostrarListadoChecklist = async (tareas = []) => {

    const choices = tareas.map( (tarea, i) => {
        const idx = `${i+1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.comletadoEn) ? true : false
        }

    });

    const pregunta = {
        type: 'checkbox',
        name: 'ids',
        message: 'Select Task(s) to Complete',
        choices
    }
    
    const {ids} = await inquirer.prompt(pregunta);
    return ids;    
}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    MostrarListadoChecklist
}