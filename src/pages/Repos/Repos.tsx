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

  const [repos, setRepos] = useState<Repo[] | null>(null)

  const { user } = useParams<string>()

  const listRepos = async (user: string) => {
    let res
    
    try {
      res = await fetch(`https://api.github.com/users/${user}/repos`)
      .then(res => res.json())
      .then((data: Repo[]) => data)

      if(res[0].message){
        throw new Error()
      }

      setRepos(res)

    } catch (error) {
      navigate("/")
    }
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
        {repos && (
          <ul className='repos-list'>
          {repos.map((repo) => 
            <li key={repo.id}>
              {repo.name} <a href={repo.html_url} target="_blank">Link</a>
            </li>)}
          </ul>
        )
        }
      </section>
    </main>
  )
}

export default Repos