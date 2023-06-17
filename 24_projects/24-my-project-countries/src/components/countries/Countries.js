import React, { useState } from 'react'
import { numberWithCommas } from '../utils/Utils'
import { Header } from '../header/Header'
import '../../styles/countries.scss'

const Country = ({ country: { name, capital, languages, population, currency, flag, } }) => {
    return (
        <div className='country'>
            <div className='country_flag'>
                <img src={flag} alt={name} />
            </div>
            <h3 className='country_name'>{name.toUpperCase()}</h3>
            <div className='country_text'>
                <p>
                    <span>Capital: </span>
                    {capital}
                </p>
                <p>
                    <span>Language: </span>
                    {languages.join(', ')}
                </p>
                <p>
                    <span>Population: </span>
                    {numberWithCommas(population)}
                </p>
                <p>
                    <span>Currecy: </span>
                    {currency}
                </p>
            </div>
        </div>
    )
}

export const Countries = (props) => {
    const [filterValue, setFilterValue] = useState('')
    const [equalCount, setEqualCount] = useState(0)

    // console.log(typeof props.data[0].capital)
    // console.log(props.data[0].capital.includes('a'))
    const equalData = props.data
        .filter(country => {
            if (!filterValue) return true
            if (country.capital === 'undefined') {console.log(country.capital)}
            if (country.name.includes(filterValue) || country.capital.includes(filterValue)) {
                return true
            }
            const langs = country.languages
                .filter(language => {
                    if (language.includes(filterValue)) {
                        return true
                    }
                })
            if (langs.length > 0) {
                return true
            }
        })

    const onChange = (e) => {
        const value = e.target.value
        setFilterValue(value)
        setEqualCount(equalData.length)
    }

    return (
        <div>
            <Header count={props.data.length} equalCount={equalCount} />
            <div className='controls'>
                <input className='search-input'
                    type='text'
                    placeholder='Search countries by name, city and languages'
                    onChange={(e) => onChange(e)}
                    value={filterValue}
                />
                <div>
                    <a href='country-data#stat'><i className='fas fa-solid fa-chart-bar'></i></a>
                </div>
            </div>
            <div className='countries-wrapper'>
                {equalData
                    .map(country => (
                        <Country country={country} languages={country.languages} key={country.name} />
                    ))}
            </div>

        </div>
    )
}
