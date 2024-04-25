import React, { useState, useEffect } from 'react';
import PriorityAdd from './priorityAdd';
import PriorityDel from './priorityDel';
import PriorityUp from './priorityUp';
import PriorityAddTask from './priorityAddtask';
import axios from 'axios';

document.title = 'Priority'; // changer le Title de la page

const Priority = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3030/priorities');
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    console.log(data);
    
    return (
        <main className='priority'>
        {data.map((priority) => (
            <section className='priorityBoard' key={priority.id}>
                <div className="priorityUpBoard">
                    <h2>{priority.label}</h2>
                    <PriorityUp id={priority.id}/>
                </div>
                <div className="priorityDownBoard">
                    <PriorityAddTask id={priority.id}/>
                    <PriorityDel id={priority.id} label={priority.label}/>
                </div>
            </section>
        ))}
            <aside>
                    <PriorityAdd />
            </aside>
        </main>
    );
};

export default Priority;
