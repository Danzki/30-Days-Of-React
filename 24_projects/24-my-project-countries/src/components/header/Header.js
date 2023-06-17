import React from 'react'
import '../../styles/header.scss'

export const Header = (props) => {
    return (
        <header id='countries' className='country-header'>
            <h2>World Countries Data</h2>
            <p className='subtitle'>Currently, we have {props.count} countries</p>
            {(props.equalCount > 0) && <p className='feedback'>{props.equalCount} satisfied the search criteria</p>}
        </header>
    )
}