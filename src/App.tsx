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
        axios.get('http://127.0.0.1:7542/users')
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

    const addUserName = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.currentTarget.value)
    }

    return (
        <div>
            <input type="text" placeholder={'enter user name'} value={userName} onChange={addUserName}/>
            <div>
                {
                    users.map((user: any) => {
                        return <div key={user.id}>
                            <p>user id: <b>{user.id}</b></p>
                            <p>user name: <b>{user.name}</b></p>
                        </div>
                    })
                }
            </div>
            <button onClick={createUser}>+</button>
        </div>

    );
}

export default App;
