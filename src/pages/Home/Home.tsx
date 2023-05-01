// CSS
import './Home.css'

// Hooks
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

interface Profile {
    name: string
    location: string
    public_repos: number
    followers: number
    following: number
    avatar_url: string
    html_url: string
    message: string
    repos_url: string
}

const Home = () => {

    const [userSearch, setUserSearch] = useState<string>('')
    const [profile, setProfile] = useState<Profile | null>()

    const { user } = useParams<string>()

    const searchProfile = async (user: string) => {

        let res = await fetch(`https://api.github.com/users/${user}`)
            .then(res => res.json())
            .then((data: Profile) => data)

        if(res.message === 'Not Found'){
            setProfile(null)
            return
        }

        setProfile(res)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        searchProfile(userSearch)
    }

    useEffect(() => {
        if(user) searchProfile(user ? user : "") 
    }, [user])

    return (
        <main className="Home">
            <h1>Buscar Perfil</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="user" placeholder='Nome de usuário' onChange={(e) => setUserSearch(e.target.value)}/>
                <button>Buscar</button>
                {profile === null && <p className='not-user'>Usuário não existe!</p>}
            </form>
            {profile && (
            <section className="container">
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
                            <Link to={profile.html_url} target='_blank'>Github</Link>
                            <Link to={`/repos/${userSearch || user}`}>Repositórios</Link>
                        </div>
                    </div>
            </section>
            )}
            
        </main>
    )
}

export default Home