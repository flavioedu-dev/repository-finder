import './Repos.css'

import{ useState, useEffect } from 'react'
import { Link, NavigateFunction, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

interface Repo {
  id: number
  name: string
  html_url: string
  message: string
}

const Repos = () => {

  const navigate: NavigateFunction = useNavigate()

  const [repos, setRepos] = useState<Repo[]>()

  const { user } = useParams<string>()

  const listRepos = async (user: string) => {
    
    let res = await fetch(`https://api.github.com/users/${user}/repos`)
      .then(res => res.json())
      .then((data: Repo[]) => data)

    if(res[0].message === 'Not Found'){
      navigate("/")
    }

    setRepos(res)

    
  }

  useEffect(() => {
    listRepos(user || "")
  }, [])
  
  return (
    <main className="Repos">
      <Link to={`/${user}`} className="back-btn">Voltar</Link>
      <h1>Repositórios</h1>
      <form>
        <input type="text" name="filter" placeholder="Nome do repositório"/>
        <button>Filtrar</button>
      </form>
      <section className="container">
        <button onClick={() => console.log(repos)}>Repos</button>
        {repos && (
          <>
          {repos.map((repo) => <p key={repo.id}>{repo.name}</p>)}
          </>
        )
        }
      </section>
    </main>
  )
}

export default Repos