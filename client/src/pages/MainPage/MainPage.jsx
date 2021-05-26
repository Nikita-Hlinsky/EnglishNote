import React from 'react'

// import React, { useCallback, useContext, useState, useEffect } from 'react'
// import {AuthContext} from '../../context/AuthContext'
// import axios from 'axios'
import './MainPage.scss'


export default function MainPage() {
    // const [text, setText] = useState('')
    // const [todos, setTodos] = useState([])
    // const {userId} = useContext(AuthContext)
    
    // const getTodo = useCallback(async () => {
    //     try {
    //         await axios.get('api/todo', {
    //             headers: {
    //                 'Context-Type': 'application/json'
    //             },
    //             params: {userId}
    //         })
    //         .then((response) => setTodos(response.data))  
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }, [userId])
    
    // const createTodo = useCallback( async () => {
    //     if (!text) {
    //         return null
    //     }
    //     try {
    //         await axios.post('/api/todo/add', {text, userId}, {
    //             headers: {
    //                 'Context-Type': 'application/json'
    //             }
    //         })
    //         .then((response) => {
    //             setTodos([...todos], response.data)
    //             setText('')
    //             getTodo()
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [text, userId, todos, getTodo]) 
    
    // useEffect(() => {
    //     getTodo()
    // }, [getTodo])

    // const removeTodos = useCallback(async (id) => {
    //     try {
    //         await axios.delete(`/api/todo/delete/${id}`, {id}, {headers:{
    //             'Context-Type': 'application/json'
    //         }})
    //         .then(() => getTodo())
            
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [getTodo])

    // const completedTodo = useCallback(async (id) => {
    //     try {
    //         await axios.put(`/api/todo/completed/${id}`, {id}, {headers:{
    //             'Context-Type': 'application/json'
    //         }})
    //         .then((response) => {
    //             setTodos([...todos], response.data)
    //             getTodo()
    //         })
            
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [getTodo, todos])

    // const importantTodo = useCallback(async (id) => {
    //     try {
    //         await axios.put(`/api/todo/important/${id}`, {id}, {headers:{
    //             'Context-Type': 'application/json'
    //         }})
    //         .then((response) => {
    //             setTodos([...todos], response.data)
    //             getTodo()
    //         })
            
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [getTodo, todos])

    

    return (
        <div className="container">
            <h1>main page</h1>
        </div>
    )
}
