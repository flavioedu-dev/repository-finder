// CSS
import './Home.css'

// Hooks
import { useState, useEffect, ReactNode } from 'react'
import { useNavigate, NavigateFunction } from 'react-router-dom'

interface Profile {
    name: string
    public_repos: number
    followers: number
    following: number
    message: string
}


const Home = () => {

    const [user, setUser] = useState<string>('')
    const [profile, setProfile] = useState<Profile | null>()

    const navigate: NavigateFunction = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        let res = await fetch(`https://api.github.com/users/${user}`).then(res => res.json())
        .then((data: Profile) => data)

        if(res.message === 'Not Found'){
            setProfile(null)
            return
        }

        setProfile(res)
    }

    return (
        <div className="Home">
            <h1>Buscar Perfil</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="user" placeholder='Nome de usuário' onChange={(e) => setUser(e.target.value)}/>
                <button>Buscar</button>
                <button onClick={() => console.log(profile)}>Log</button>
                {profile === null && <p className='not-user'>Usuário não existe!</p>}
                {profile && <>{navigate(`/user/${user}`)}</>}
            </form>
            
        </div>
    )
}

export default Home