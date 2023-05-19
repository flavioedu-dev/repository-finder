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

  const [repos, setRepos] = useState<Repo[] | null>([])
  const [recoveryRepos, setRecoveryRepos] = useState<Repo[]>([])
  const [filter, setFilter] = useState<string>("")

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
      setRecoveryRepos(res)

    } catch (error) {
      navigate("/")
    }
  }

  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(filter){
      const filteredRepos = recoveryRepos?.filter((repo) => repo.name.toLowerCase().includes(filter))
      
      setRepos(filteredRepos || [])
      return
    }

    setRepos(null)
    console.log(filter)
  }

  useEffect(() => {
    listRepos(user || "")
  }, [])
  
  return (
    <main className="Repos">
      <Link to={`/repository-finder/${user}`} className="back-btn">Voltar</Link>
      <h1>Repositórios</h1>
      <form onSubmit={handleFilter}>
        <input type="text" name="filter" placeholder="Nome do repositório" onChange={(e) => setFilter(e.target.value)}/>
        <button>Filtrar</button>
      </form>
      <section className="container">
        {repos ? (
          <ul className='repos-list'>
          {repos.map((repo) => 
            <li key={repo.id}>
              {repo.name} <a href={repo.html_url} target="_blank">Link</a>
            </li>)}
          </ul>
        ) : (
          <ul className='repos-list'>
          {recoveryRepos.map((repo) => 
            <li key={repo.id}>
              {repo.name} <a href={repo.html_url} target="_blank">Link</a>
            </li>)}
          </ul>
        )}
      </section>
    </main>
  )
}

export default Repos