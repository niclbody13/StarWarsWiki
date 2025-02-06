import { Link, NavLink, Outlet, useParams, useSearchParams } from 'react-router-dom'
import people from './data/people.json'
import planets from './data/planets.json'
import films from './data/films.json'
import { useState, useEffect } from 'react'


export default function App(props) {
    const { children } = props
    return (
        <>
            <nav className="nav">
                <NavLink to='/' className='home'>Star Wars</NavLink>
                <ul>
                    <li><NavLink to='/people'>People</NavLink></li>
                    <li><NavLink to='/planets'>Planets</NavLink></li>
                    <li><NavLink to='/films'>Films</NavLink></li>
                </ul>
            </nav>
            <main className='content'>{children || <Outlet />}</main>
        </>
    ) 
    
}


export function PeopleSidebar() {
    const [ persons, setPersons ] = useState([])

    useEffect(() => {
        // setPersons(people)
        const peopleArr = Object.keys(people).map(key =>({
            id: key,
            ...people[key]
        }))
        setPersons(peopleArr)
    }, [])

    return (
        <>
            <aside className='sideBar'>
                <ul>
                    {persons.map(person => (
                        <li key={person.id}><NavLink to={person.id} className='sideBarItem'>{person.name}</NavLink></li>
                    ))}  
                </ul>
            </aside>
            <div><Outlet /></div>
        </>
    )
}


export function PlanetsSidebar() {
    const [ planetsState, setPlanets ] = useState([])

    useEffect(() => {
        const planetsArr = Object.keys(planets).map(key =>({
            id: key,
            ...planets[key]
        }))
        setPlanets(planetsArr)
    }, [])

    return (
        <>
            <aside className='sideBar'>
                <ul>
                    {planetsState.map(planet => (
                        <li key={planet.id}><NavLink to={planet.id} className='sideBarItem'>{planet.name}</NavLink></li>
                    ))}  
                </ul>
            </aside>
            <div><Outlet /></div>
        </>
    )
}


export function FilmsSidebar() {
    const [ filmsState, setPlanets ] = useState([])

    useEffect(() => {
        const filmsArr = Object.keys(films).map(key =>({
            id: key,
            ...films[key]
        }))
        setPlanets(filmsArr)
    }, [])

    return (
        <>
            <aside className='sideBar'>
                <ul>
                    {filmsState.map(film => (
                        <li key={film.id}><NavLink to={film.id} className='sideBarItem'>{film.title}</NavLink></li>
                    ))}  
                </ul>
            </aside>
            <div><Outlet /></div>
        </>
    )
}


export function Person() {
    const  params = useParams()
    const [ searchParams, setSearchParams ] = useSearchParams()

    const person = people[params.person]
    const keys = Object.keys(person)
    
    return (
        <div className='person'>
            <h1>{person.name}</h1>
            {keys.slice(1, 10).map((key, index) => (
                <div key={index}>
                    <strong>{key}: </strong>
                    {Array.isArray(person[key]) ? renderList(person[key]) : null}
                    {key === 'homeworld' ? <NavLink to={person[key]}>{person[key]}</NavLink> : null}
                    {key !== 'films' && key !== 'homeworld' ? <p className='attributes'>{person[key]}</p> : null}
                    
                </div>
            ))}
        </div>
    )
} 


export function Planet() {
    const  params = useParams()
    const [ searchParams, setSearchParams ] = useSearchParams()

    const planet = planets[params.planet]
    const keys = Object.keys(planet)
    
    return (
        <div className='planet'>
            <h1>{planet.name}</h1>
            {keys.slice(1, 11).map((key, index) => (
                <div key={index}>
                    {planet[key] !== null && planet[key].length !== 0 ? (
                        <div>
                            <strong>{key}: </strong>
                            {Array.isArray(planet[key]) ? renderList(planet[key]) : <p className='attributes'>{planet[key]}</p>}
                        </div>)
                        : <div>
                            <strong>{key}: </strong> 
                            <p className='attributes'>N/A</p>
                          </div>
                        
                    }
                </div>

            ))}
        </div>
    )
}


export function Film() {
    const  params = useParams()
    const [ searchParams, setSearchParams ] = useSearchParams()

    const film = films[params.film]
    const keys = Object.keys(film)
    
    return (
        <div className='film'>
            <h1>{film.title}</h1>
            {keys.slice(1, 8).map((key, index) => (
                <div key={index}>
                    <strong>{key}: </strong>
                    {Array.isArray(film[key]) ? renderList(film[key]) : <p className='attributes'>{film[key]}</p>}
                    
                </div>
            ))}
        </div>
    )
}


function renderList(list) {
    return (
        <ul className='filmsList'>
            {list.map((key, index) => (
                <li key={index}><NavLink to={key}>{key}</NavLink></li>
            ))}
        </ul>
    )
}


export function Home() {
    return (
        <div className='basicPage'>This is the Home page for a Star Wars database.</div>
    )
}


export function People() {
    return (
        <div className='basicPage'>This is the People page.</div>
    )
}


export function Planets() {
    return (
        <div className='basicPage'>This is the Planets page.</div>
    )
}


export function Films() {
    return (
        <div className='basicPage'>This is the Films page.</div>
    )
}

export function ErrorPage() {
    return (
        <div className='basicPage'>Error: Not Found.</div>
    )
}