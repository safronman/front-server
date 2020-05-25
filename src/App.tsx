import React, {useEffect, useState} from 'react';
import axios from 'axios'
import './App.css';

function App() {
    const [users, setUsers] = useState<any>([])

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
        axios.post('http://127.0.0.1:7542/users')
            .then((res) => {
                if (res.data.success) {
                    getUsers()
                }
            })
    }

    return (
        <div>
            <div>
                {
                    users.map((user: any) => {
                        return <div>
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
