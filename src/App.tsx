import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export enum fvenum {
    all = 'all',
    active = 'active',
    completed = 'completed',
}

export type FilterValuesType = fvenum.all | fvenum.active | fvenum.completed;

export type TodoListEntryType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {
//id
    let todolistID1 = v1();
    let todolistID2 = v1();

//todo
    let [todolists, setTodolists]
        = useState<Array<TodoListEntryType>>([
        {id: todolistID1, title: 'What to learn', filter: fvenum.all},
        {id: todolistID2, title: 'What to buy', filter: fvenum.all},
    ])
    console.log(' todolists: ', todolists);

//tasks
    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    console.log(' tasks: ', tasks);

//func
    function removeTask(todolistId: string, id: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id)})
    }

    function addTask(title: string, todolistId: string) {
        setTasks({
            ...tasks, [todolistId]: [{id: v1(), title: title, isDone: false}, ...tasks[todolistId]]
        });
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})
    }

    function changeFilter(index: number, value: FilterValuesType) {
        const t = [...todolists,  {...todolists[+index], filter: value}];
        console.log(t);
        setTodolists([...todolists,  {...todolists[+index], filter: value}])
    }

    function removeTodolist (todolistId: string){
        // delete todolists
        // setTodolists({...todolists.})
    }

    return (
        <div className="App">
            {todolists.map((el, index) => {
                return (
                    <Todolist
                        key={el.id}
                        todolistId={el.id}
                        title={el.title}
                        tasks={tasks[el.id]}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        todolist={todolists[index]}
                        index={index}
                    />
                )
            })}


        </div>
    );
}

export default App;
