import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTaskBoard from "../components/assignments/AddTaskBoard";
import DelTaskBoard from "../components/assignments/DelTaskBoard";
import AddUserTask from "../components/assignments/AddUserTask";
import DelUserTask from "../components/assignments/DelUserTask";
import DelPrioTask from "../components/assignments/DelPrioTask";

import "../css/assignPageTestRui.css"


function Testrui(){

    document.title = 'RUI TEST'; // changer le Title de la page

    const [boards, setBoards] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        listeBoards(); 
        listeTasks(); 
        listeUsers(); 
    }, []);

    const listeBoards = async () => {
        try {
            const result = await axios.get(`http://localhost:3030/boards`);
            setBoards(result.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des boards:", error);
        }
    };

    const listeTasks = async () => {
        try {
            const result = await axios.get(`http://localhost:3030/tasks`);
            setTasks(result.data); 
        } catch (error) {
            console.error("Erreur lors de la récupération des tasks:", error); 
        }
    };

    const listeUsers = async () => {
        try {
            const result = await axios.get(`http://localhost:3030/users`);
            setUsers(result.data); 
        } catch (error) {
            console.error("Erreur lors de la récupération des Users:", error); 
        }
    };


    // console.log(boards[0].task_id);
    // console.dir(tasks);

    return (
        <div className="bodyTestRui">
            <aside>
                <h2>liste Tâches</h2>

                {tasks.map( task => (
                    <div key={"asTask_"+task.id} className="afficherTache">
                        <h3>{task.task_name}</h3>
                        <div className="afficherUsers">
                            {users.map( user => (
                                task.users_id ? (
                                    task.users_id.includes(+user.id) ? (
                                        <DelUserTask 
                                        key={"tu-"+user.id} 
                                        name={user.name[0]} 
                                        userID={user.id} 
                                        userName={user.name} 
                                        taskID={task.id} 
                                        />
                                    )
                                    : null
                                ) : null
                            ))}
                        </div>
                        <AddTaskBoard name="Add to board" taskID={task.id} />

                        <AddUserTask name="Assign to User" taskID={task.id} />
                    </div>
                ))}
            </aside>
            <section>
                <h2>liste Tableau avec Taches</h2>
                
                    {boards.map( board => (
                        <div key={"board_"+board.id} className="afficherTableaux">
                            <h3 key={"bn_"+board.id}>{board.board_name}</h3>
                            <article>
                            {tasks.map( task => (
                                board.task_id.includes(+task.id) ? (

                                <div key={"bt-"+board.id+'_'+task.id} className="afficherTache">
                                    <h3>{task.task_name}</h3>
                                    <div className="afficherUsers">
                                        {users.map( user => (
                                            task.users_id ? (

                                                task.users_id.includes(+user.id) ? (
                                                    <span key={"btu-"+board.id+'_'+user.id}>
                                                    <DelUserTask 
                                                    name={user.name[0]} 
                                                    userID={user.id} 
                                                    userName={user.name} 
                                                    taskID={task.id} 
                                                    />
                                                </span>

                                                )
                                                : null
                                            ) : null
                                        ))}
                                    </div>
                                    <DelTaskBoard name="Del from board" boardID={board.id} taskID={task.id} />

                                    {task.priority_id !== 0 ? (
                                            <DelPrioTask name="Del Priority from Task" taskID={task.id} />
                                        )
                                        : null
                                    }

                                </div>
                                )
                                : null

                            ))}
                            
                            </article>
                        </div>
                    ))}
        
            </section>
        </div>
    );
}

export default Testrui