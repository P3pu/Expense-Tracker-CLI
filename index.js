#!/usr/bin/env node

import { Command, program } from 'commander'
import {
    loadTasks,
    saveTasks,
    addTasks,
    dateTasks,
    timeTasks,
    listTasks,
    idTasks,
    totalExpense,
    monthTasks,
    getMonthExpense,
    deleteTasks
} from './functions.js'

// config basica
program
    .name("EXPENSE TRACKER")
    .description("Gerenciar as despesas")
    .version('1.0.0')

program
    .command('add')
    .description("Adicionar despesa")
    .option('-d, --description <description>', 'descrição da tarefa')
    .option('-a, --amount <amount>', "Valor da Despesa")
    // .option('-up','--update',"Atualizar valores")
    // .option('-d','--delete <id>','Deletar registros')
    // .option('-l','--list','Lista todas as despesas')
    // .option('-s','--summary','resumo das despesas')
    // .option('-m','--month <number>')
    .action(options => {
        if (options.description && options.amount) {
            addTasks(options.description, options.amount)
            console.log('Expense added successfully')
        }
        else {
            console.log('Digite a despesa e a descrição da despesa')
        }
    })

program
    .command('list')
    .description('Lista todas as despesas')
    .action(list => {
        listTasks()
    })

program
    .command('summary')
    .description('Total das Despesas')
    .option('-m,--month [month]', 'mes da despesa')
    .action((options) => {
        if (options.month) {
            getMonthExpense(options.month)
        } else {
            totalExpense()
        }
    })

program
    .command('delete')
    .description('Deleta despesa pelo id')
    .option('-i,--id <id>', 'valor ID')
    .action(option => {
        deleteTasks(option.id)
        console.log('Expense deleted successfully')
    })


// vai passar os argumentos para alinha de comando
program.parse(process.argv)


