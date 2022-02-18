import React, { useEffect, useState } from 'react'
import { ListTodo } from './ListTodo'
import { SearchTodo } from './SearchTodo'

export const ToDoListContainer = () => {

    const [filterSelected, setFilterSelected] = useState({
        name: 'All',
        isSelected: true
    })

    const [searchTodos, setSearchTodos] = useState([]);

    const [date, setDate] = useState(new Date().toUTCString());
    useEffect(() => {
        const interval = setInterval(() => setDate(new Date().toUTCString()), 1000);
        return () => clearInterval(interval);
    }, [])


    const handleSetFilter = ({ target }) => {
        setFilterSelected({
            name: target.textContent,
            isSelected: true
        })
    }

    const changeClass = (value) => {
        return (filterSelected.name === value ? 'is-selected' : '');
    }

    return (
        <div className='container-todoui__to-do-list-container'>

            <div className='container-todoui__to-do-list-container__info-list'>
                <h2>To do list</h2>
                <small>{date}</small>
            </div>

            <nav className='container-todoui__to-do-list-container__nav'>
                <span onClick={handleSetFilter} className={changeClass('All')}>All</span>
                <span onClick={handleSetFilter} className={changeClass('Pending')}>Pending</span>
                <span onClick={handleSetFilter} className={changeClass('Complete')}>Complete</span>
            </nav>

            <SearchTodo setSearchTodos={setSearchTodos} />

            <ListTodo todoListToShow={filterSelected} searchTodos={searchTodos} />
        </div>
    )
}
