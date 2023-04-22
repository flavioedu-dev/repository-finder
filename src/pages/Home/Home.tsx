// CSS
import './Home.css'

// Hooks
import { useState } from 'react'
import { Link } from 'react-router-dom'

interface Profile {
    name: string
    location: string
    public_repos: number
    followers: number
    following: number
    avatar_url: string
    html_url: string
    message: string
}


const Home = () => {

    const [user, setUser] = useState<string>('')
    const [profile, setProfile] = useState<Profile | null>()

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
        <main className="Home">
            <h1>Buscar Perfil</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="user" placeholder='Nome de usuário' onChange={(e) => setUser(e.target.value)}/>
                <button>Buscar</button>
                {/* <button onClick={() => console.log(profile)}>Log</button> */}
                {profile === null && <p className='not-user'>Usuário não existe!</p>}
            </form>
            {profile && (
            <section>
                    <img src={profile.avatar_url} alt="profile-image" />
                    <h1>{profile.name}</h1>
                    <h2>{profile.location}</h2>

                    <div className="user-info">
                        <div>
                            <p>Número de repositórios: <span>{profile.public_repos}</span></p>
                            <p>Seguidores: <span>{profile.followers}</span></p>
                            <p>Seguindo: <span>{profile.following}</span></p>
                        </div>

                        <div>
                            <Link to={profile.html_url}>Github</Link>
                            <Link to="/repos/:user">Repositórios</Link>
                        </div>
                    </div>
            </section>
            )}
            
        </main>
    )
}

export default Home