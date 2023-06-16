import React, { useState, useEffect } from 'react'
import { numberWithCommas } from '../utils/Utils'

const PopulationGraph = ({ population: { country, population }, totalPopulation }) => {
    const countryPopulationPrc = (population / totalPopulation) * 100
    return (
        <div className='graphWrapper' key={country}>
            <div className='bars'>
                <div>{country}</div>
                <div className="bar" style={{ width: `${countryPopulationPrc}%`, height: 35 }}></div>
                <div>{numberWithCommas(population)}</div>
            </div>
        </div>
    )
}

const LanguagesGraph = ({ language: { name, count, prc } }) => {
    return (
        <div className='graphWrapper'>
            <div className='bars' key={name}>
                <div>{name}</div>
                <div className="bar" style={{ width: `${prc}%`, height: 35 }}></div>
                <div>{numberWithCommas(count)}</div>
            </div>
        </div>
    )
}

const PopulationTitle = ({ populationCount }) => {
    return <h4 className="graph-title">{populationCount} Most populated countries in the world</h4>
}

const LanguagesTitle = ({ languagesCount }) => {
    return <h4 className="graph-title">{languagesCount} Most spoken languages in the world</h4>
}

const Title = ({ button, populationCount, languagesCount }) => {
    if (button === 'population') {
        return <PopulationTitle populationCount={populationCount} />
    } else {
        return <LanguagesTitle languagesCount={languagesCount} />
    }
}

const Graph = ({ button, population, languages }) => {
    if (button === 'population') {
        const totalPopulation = population.filter(c => c.country === 'World')
            .reduce((a, b) => { return a + parseInt(b.population) }, 0)

        return (
            population.map((pop) => (
                <PopulationGraph population={pop} totalPopulation={totalPopulation} key={pop.country} />
            ))
        )
    } else {
        return (
            languages.map((lang) => (
                <LanguagesGraph language={lang} key={lang.name} />
            ))
        )
    }
}

const Graphs = (props) => {
    const [buttonValue, setButtonValue] = useState('population')

    const onClickPopulation = () => {
        setButtonValue('population')
    }
    const onClickLanguage = () => {
        setButtonValue('language')
    }

    return (
        <div className='graph-wrapper'>
            <div className='graph-buttons'>
                <button className='population' onClick={() => onClickPopulation()}>Population</button>
                <button className='languages' onClick={() => onClickLanguage()}>Languages</button>
            </div>
            <Title
                button={buttonValue}
                populationCount={props.population.length - 1}
                languagesCount={props.languages.length}
            />
            <div className='graphs'>
                <div className='graph-wrapper'>
                    <Graph
                        button={buttonValue}
                        population={props.population}
                        languages={props.languages}
                    />
                </div>
            </div>
        </div >
    )
}

export default Graphs