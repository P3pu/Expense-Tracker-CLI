import { readFile, readFileSync, writeFile } from 'fs'
import path from 'path'
const path1 = "db.json"

export const loadTasks = () => {
    const db = readFileSync(path1, 'utf-8')
    if (!db) {
        return []
    }
    const dbfile = JSON.parse(db)
    return dbfile
}
export const saveTasks = (listTasks) => {
    writeFile(path1, JSON.stringify(listTasks, null, 2), 'utf-8', e => {
        if (e) {
            return e
        }
    })
}
export const addTasks = (description, value) => {
    const listTasks = loadTasks()

    const newlist = {
        id: idTasks(),
        description: description,
        expense: value,
        date: dateTasks(),
        hour: timeTasks(),
        month: monthTasks()
    }
    listTasks.push(newlist)
    saveTasks(listTasks)
}
export const dateTasks = () => {
    const date = new Date()
    const dateToday = date.toLocaleDateString()
    return dateToday
}
export const timeTasks = () => {
    const date = new Date()
    const timeToday = date.toLocaleTimeString()
    return timeToday
}
export const listTasks = () => {
    const listTasks = loadTasks()
    console.log('ID  Date         Description     Amount');
    listTasks.forEach((element,i) => {
        console.log(`${listTasks[i].id}   ${listTasks[i].date}    ${listTasks[i].description}         $${listTasks[i].expense}`)
    });
    // for (let i = 0; i < listTasks.length; i++) {
    //     console.log(` ${listTasks[i].id}    ${listTasks[i].description}         $${listTasks[i].expense}     ${listTasks[i].date}    ${listTasks[i].hour}`)
    // }
}
export const idTasks = () => {
    const listTasks = loadTasks()
    const id = listTasks.length + 1
    return id

}
export const totalExpense = () => {
    const listTasks = loadTasks()
    let soma = 0
    for (let index = 0; index < listTasks.length; index++) {
        soma = soma + Number(listTasks[index].expense)
    }

    return console.log(`Total expense: $${soma}`)
}
export const monthTasks = () => {
    const date = new Date()
    const month = date.getMonth() + 1
    return month
}
export const getMonthExpense = (month) => {
    const listTasks = loadTasks()
    const date = new Date(2000, month - 1)
    for (let index = 0; index < listTasks.length; index++) {
        if (listTasks[index].month == month) {
            return console.log(`Total Expense of ${date.toLocaleString('en-US', { month: 'long' })}: $${listTasks[index].expense}`)
        }
    }
    return console.log('insira o numero do mês')

}

export const deleteTasks = (id) => {
    const listTasks = loadTasks()
    const index = listTasks.findIndex(item => item.id == id)
    if (index !== -1) {
        listTasks.splice(index, 1)
        saveTasks(listTasks) // atualizando 
    } else {
        console.log('Deu Ruim!')
    }
}
