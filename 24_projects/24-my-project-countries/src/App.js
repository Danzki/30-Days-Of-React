import React, { useState, useEffect } from 'react'
import { Footer } from './components/footer/Footer'
import { Countries } from './components/countries/Countries'
import Graphs from './components/graphs/Graphs'
import { countriesData } from './data/countries'
import { tenHighestPopulation } from './data/ten_most_highest_populations.js'
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom'

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

function getLanguage(languageObj) {
    const langs = []
    for (let key in languageObj) {
        langs.push(languageObj[key])
    }
    return langs
}

function getCurrency(ccyObj) {
    for (let key in ccyObj) {
        return ccyObj[key].name
    }
}

function getCapital(capitalArr) {
    return capitalArr[0]
}

function getCapitalLength(capitalArr) {
    return capitalArr.length
}

function compare(a, b) {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}

export const App = (props) => {
    // setting initial state and method to update state
    const [data, setData] = useState([])
    const [count, setCount] = useState([])
    const [population, setPopulation] = useState([])
    const [languages, setLanguages] = useState([])

    useEffect(() => {
        fetchData()
        // loadData()
        loadPopulation()
        loadLanguages()
    }, [])

    const fetchData = async () => {
        // const url = 'https://restcountries.com/rest/v2/all'
        // const url = 'https://restcountries.com/v3.1/all'
        const url = 'https://restcountries.com/v3.1/all?fields=name,capital,languages,population,flags,currencies'
        try {
            const response = await fetch(url)
            const data = await response.json()

            const formattedData = data
                .filter((country) => {
                    if (getCapitalLength(country.capital) > 0) {
                        return true
                    }
                })
                .map((country) => {
                    return {
                        name: country.name.common,
                        capital: getCapital(country.capital),
                        languages: getLanguage(country.languages),
                        population: country.population,
                        flag: country.flags.svg,
                        currency: getCurrency(country.currencies),
                    }
                })
            
            setData(formattedData.sort(compare))
            setCount(formattedData.length)
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
            <Countries data={data} />
            <Graphs
                population={population}
                languages={languages} />
            <Footer />
        </div>

    )
}