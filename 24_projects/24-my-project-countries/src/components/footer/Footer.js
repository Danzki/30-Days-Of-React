import React from 'react'
import '../../styles/footer.scss'

export const Footer = (props) => {
    return (
        <footer className='country-footer'>
            <div className='country-footer-wrapper'>
                <p>Copyright @2023 30 Days of React</p>
                <p>
                    Join {' '}
                    <a href="https://github.com/Asabeneh/30-Days-Of-React" target="_blank" rel="noopener noreferrer">30 Days of React challenge</a>
                </p>
                <small>
                    Designed, Built and Snatched by {' '} 
                    <a href="https://www.linkedin.com/in/danzki/" target="_blank" rel="noopener noreferrer">Danzki</a>
                </small>
                <div className='arrow'>
                    <a href="#root"><i className="fas fa-arrow-alt-circle-up"></i></a>
                </div>
            </div>
        </footer>
    )
}