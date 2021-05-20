import React, { useCallback, useContext, useState, useEffect } from 'react'
import {AuthContext} from '../../context/AuthContext'
import axios from 'axios'
import './MainPage.scss'


export default function MainPage() {
    const [text, setText] = useState('')
    const [todos, setTodos] = useState([])
    const {userId} = useContext(AuthContext)
    
    const getTodo = useCallback(async () => {
        try {
            await axios.get('api/todo', {
                headers: {
                    'Context-Type': 'application/json'
                },
                params: {userId}
            })
            .then((response) => setTodos(response.data))  
        } catch (error) {
            console.log(error)
        }
    }, [userId])
    
    const createTodo = useCallback( async () => {
        if (!text) {
            return null
        }
        try {
            await axios.post('/api/todo/add', {text, userId}, {
                headers: {
                    'Context-Type': 'application/json'
                }
            })
            .then((response) => {
                setTodos([...todos], response.data)
                setText('')
                getTodo()
            })
        } catch (error) {
            console.log(error);
        }
    }, [text, userId, todos, getTodo]) 
    
    useEffect(() => {
        getTodo()
    }, [getTodo])

    const removeTodos = useCallback(async (id) => {
        try {
            await axios.delete(`/api/todo/delete/${id}`, {id}, {headers:{
                'Context-Type': 'application/json'
            }})
            .then(() => getTodo())
            
        } catch (error) {
            console.log(error);
        }
    }, [getTodo])

    const completedTodo = useCallback(async (id) => {
        try {
            await axios.put(`/api/todo/completed/${id}`, {id}, {headers:{
                'Context-Type': 'application/json'
            }})
            .then((response) => {
                setTodos([...todos], response.data)
                getTodo()
            })
            
        } catch (error) {
            console.log(error);
        }
    }, [getTodo, todos])

    const importantTodo = useCallback(async (id) => {
        try {
            await axios.put(`/api/todo/important/${id}`, {id}, {headers:{
                'Context-Type': 'application/json'
            }})
            .then((response) => {
                setTodos([...todos], response.data)
                getTodo()
            })
            
        } catch (error) {
            console.log(error);
        }
    }, [getTodo, todos])

    

    return (
        <div className="container">
            <div className="main-page">
                <h4>Add a task</h4>
                <form className="form form-login" onSubmit={e => e.preventDefault()}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input 
                                type="text"
                                id="text"
                                name="input"
                                value={text}
                                className="validate"
                                onChange={e => setText(e.target.value)}
                            />
                            <label htmlFor="input">Task:</label>
                        </div>
                    </div>
                    <div className="row">
                        <button className="waves-effect waves-light btn blue" onClick={createTodo}>Add</button>
                    </div>
                </form>

                <h3>Active tasks:</h3>
                <div className="todos">
                    {
                        todos.map((todo, index) => {
                            let cls = ['row flex todos-item']
                            
                            if (todo.important) {
                                cls.push('important')
                            }
                            if (todo.completed) {
                                cls.push('completed')
                            }

                            return (
                                <div className={cls.join(' ')} key={index}>
                                    <div className="col todos-num">{index + 1}</div>
                                    <div className="col todos-text">{todo.text}</div>
                                    <div className="col todos-btns">
                                        <i className="material-icons blue-text" onClick={() => completedTodo(todo._id)}>check</i>
                                        <i className="material-icons orange-text" onClick={() => importantTodo(todo._id)}>warning</i>
                                        <i className="material-icons red-text" onClick={() => removeTodos(todo._id)}>delete</i>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
