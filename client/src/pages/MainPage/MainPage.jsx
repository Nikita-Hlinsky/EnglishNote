import React, { useCallback, useContext, useState, useEffect } from 'react'
import {AuthContext} from '../../context/AuthContext'
import axios from 'axios'
import './MainPage.scss'


export default function MainPage() {
    const [word, setWord] = useState('')
    const [translate, setTranslate] = useState('')
    const [words, setWords] = useState([])
    const {userId} = useContext(AuthContext)
    
    const getWord = useCallback(async () => {
        try {
            await axios.get('api/word', {
                headers: {
                    'Context-Type': 'application/json'
                },
                params: {userId}
            })
            .then((response) => setWords(response.data))  
        } catch (error) {
            console.log(error)
        }
    }, [userId])
    
    const createWord = useCallback( async () => {
        if (!word) {
            return null
        }
        try {
            await axios.post('/api/word/add', {word, translate, userId}, {
                headers: {
                    'Context-Type': 'application/json'
                }
            })
            .then((response) => {
                setWords([...words], response.data)
                setWord('')
                setTranslate('')
                getWord()
            })
        } catch (error) {
            console.log(error);
        }
    }, [word, translate, userId, words, getWord]) 
    
    useEffect(() => {
        getWord()
    }, [getWord])

    const removeWords = useCallback(async (id) => {
        try {
            await axios.delete(`/api/word/delete/${id}`, {id}, {headers:{
                'Context-Type': 'application/json'
            }})
            .then(() => getWord())
            
        } catch (error) {
            console.log(error);
        }
    }, [getWord])

    const completedWords = useCallback(async (id) => {
        try {
            await axios.put(`/api/word/completed/${id}`, {id}, {headers:{
                'Context-Type': 'application/json'
            }})
            .then((response) => {
                setWords([...words], response.data)
                getWord()
            })
            
        } catch (error) {
            console.log(error);
        }
    }, [getWord, words])

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
            <div className="main-page">
                <h4>Add new word</h4>
                <form className="form form-login" onSubmit={e => e.preventDefault()}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input 
                                type="text"
                                id="word"
                                name="input"
                                value={word}
                                className="validate"
                                onChange={e => setWord(e.target.value)}
                            />
                            <label htmlFor="input">word</label>
                        </div>
                        <div className="input-field col s12">
                            <input 
                                type="text"
                                id="translate"
                                name="input"
                                value={translate}
                                className="validate"
                                onChange={e => setTranslate(e.target.value)}
                            />
                            <label htmlFor="input">translate</label>
                        </div>
                    </div>
                    <div className="row">
                        <button className="waves-effect waves-light btn blue" onClick={createWord}>Add</button>
                    </div>
                </form>

                <h3>Saved words:</h3>
                <div className="todos">
                    {
                        words.map((word, index) => {
                            let cls = ['row flex todos-item']
                            
                            // if (word.important) {
                            //     cls.push('important')
                            // }
                            if (word.completed) {
                                cls.push('completed')
                            }

                            return (
                                <div className={cls.join(' ')} key={index}>
                                    {/* <div className="col todos-num">{index + 1}</div> */}
                                    <div className="col todos-text">{word.word}</div>
                                    <p> - </p>
                                    <div className="col todos-text">{word.translate}</div>
                                    <div className="col todos-btns">
                                        <i className="material-icons blue-text" onClick={() => completedWords(word._id)}>check</i>
                                        {/* <i className="material-icons orange-text" onClick={() => importantTodo(word._id)}>warning</i> */}
                                        <i className="material-icons red-text" onClick={() => removeWords(word._id)}>delete</i>
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
