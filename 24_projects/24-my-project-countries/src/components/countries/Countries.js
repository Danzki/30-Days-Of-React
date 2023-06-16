import React, { useState } from 'react'
import { numberWithCommas } from '../utils/Utils'
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

    const onChange = (e) => {
        const value = e.target.value
        setFilterValue(value)
    }

    return (
        <div>
            <div className='controls'>
                <input className='search-input'
                    type='text'
                    placeholder='Search countries by name, city and languages'
                    onChange={(e) => onChange(e)}
                    value={filterValue}
                />
                <div>
                    <a href="#stat"><i className="fas fa-chart-bar"></i></a>
                </div>
            </div>
            <div className='countries-wrapper'>
                {props.data
                    .filter(country => {
                        if (!filterValue) return true
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
                    .map(country => (
                        <Country country={country} languages={country.languages} key={country.name} />
                    ))}
            </div>

        </div>
    )
}
