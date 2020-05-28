import React, {ChangeEvent, useEffect, useState} from 'react';
import axios from 'axios'
import './App.css';

function App() {
    const [users, setUsers] = useState<any>([])
    const [userName, setUserName] = useState<string>('')

    useEffect(() => {
        getUsers()
    }, [])


    const getUsers = () => {
        const search = window.location.search

        axios.get('http://127.0.0.1:7542/users' + search)
            .then((res) => {
                setUsers(res.data)
            })
    }

    const createUser = () => {
        axios.post('http://127.0.0.1:7542/users', {name: userName})
            .then((res) => {
                if (res.data.success) {
                    getUsers()
                }
            })
    }

    const onDeleteUser = (userId: string) => {
        axios.delete(`http://127.0.0.1:7542/users/${userId}`)
            .then((res) => {
                getUsers()
            })
    }

    const addUserName = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.currentTarget.value)
    }

    const updateUser = (name: string, id: string) => {
        axios.put(`http://127.0.0.1:7542/users`, {name, id})
            .then((res) => {
                getUsers()
            })
    }

    const usersJsx = users.map((user: any) => {
        return <div key={user.id} className="userWrapper">
            <p>user id: <b>{user._id}</b></p>
            user name: <input type={"text"} defaultValue={user.name}
                              onBlur={(e) => updateUser(e.currentTarget.value, user._id)}/>
            <button onClick={() => {
                onDeleteUser(user._id)
            }}>Delete user
            </button>
        </div>
    })

    return (
        <div>
            <input type="text" placeholder={'enter user name'} value={userName} onChange={addUserName}/>
            <button onClick={createUser}>Create user</button>
            <div>{usersJsx}</div>
        </div>
    );
}

export default App;
