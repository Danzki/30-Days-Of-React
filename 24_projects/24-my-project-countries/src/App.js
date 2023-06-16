import React, { useState, useEffect } from 'react'
import { Header } from './components/header/Header'
import { Footer } from './components/footer/Footer'
import { Countries } from './components/countries/Countries'
import Graphs from './components/graphs/Graphs'
import { countriesData } from './data/countries'
import { tenHighestPopulation } from './data/ten_most_highest_populations.js'

function getTopSpokenLangs(countries, count) {
    let langs = [].concat(...countries
        .map((c) => (
            c.languages.map((lang) => (lang))
        )))

    const langUses = {};
    for (const lang of langs) {
        if (!langUses[lang]) {
            langUses[lang] = 0;
        }
        langUses[lang]++;
    }
    const langsCount = Object.keys(langUses).length

    const langUsesArr = Object.entries(langUses)
        .map(([lang, count]) => ({
            lang,
            count,
        }))
        .sort((a, b) => (
            b.count - a.count
        ))
        .slice(0, count)
        .map(({ lang, count }) => ({ name: lang, count: count, prc: (count / langsCount) * 100 }))
    return langUsesArr
}

export const App = (props) => {
    // setting initial state and method to update state
    const [data, setData] = useState([])
    const [count, setCount] = useState([])
    const [population, setPopulation] = useState([])
    const [languages, setLanguages] = useState([])

    useEffect(() => {
        // fetchData()
        loadData()
        loadPopulation()
        loadLanguages()
    }, [])

    const fetchData = async () => {
        const url = 'https://restcountries.eu/rest/v2/all'
        try {
            const response = await fetch(url)
            const data = await response.json()
            setData(data)
            setCount(data.length)
        } catch (error) {
            console.log(error)
        }
    }

    const loadData = () => {
        setData(countriesData)
        setCount(countriesData.length)
    }

    const loadPopulation = () => {
        setPopulation(tenHighestPopulation)
    }

    const loadLanguages = () => {
        const countLang = 10
        const langUsesArr = getTopSpokenLangs(countriesData, countLang)
        setLanguages(langUsesArr)
    }

    return (
        <div className='App'>
            <Header count={count} />
            <Countries data={data} />
            <Graphs
                population={population}
                languages={languages}                
            />            
            <Footer />
        </div>
    )
}