import React, { useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import './styles/hexa-color-generator.scss'
import './styles/form.scss'

const hexaColor = () => {
  let str = '0123456789abcdef'
  let color = ''
  for (let i = 0; i < 6; i++) {
    let index = Math.floor(Math.random() * str.length)
    color += str[index]
  }
  return '#' + color
}

const generate = (count) => {
  const arr = Array(count)

  for (let i = 0; i <= count; i++) {
    const item = hexaColor()
    arr[i] = item
  }

  return arr
}

const RandomBox = (props) => {
  return (
    <div className='single-color' style={{ backgroundColor: props.bgColor }}>
      <small> {props.bgColor} </small>
      <div className='wrapper__copy copy'>
        <i className="far fa-clipboard" style={{ cursor: 'pointer', color: 'white', fontSize: '28px', }}></i>
      </div>
    </div>
  )
}

const App = (props) => {
  const [bgColors, setBgColors] = useState(generate(props.count))
  const ref = useRef(null)

  const onClick = () => {
    setBgColors(generate(props.count))
    ref.current.value = props.count
  }
  const onChange = () => {

  }

  return (
    <div className='App'>
      <div className='color-app'>
        <div className='header'>
          <h1>30 Days Of React</h1>
          <h2>Hexadecimal Colors</h2>
        </div>
        <div className='color-generator-row'>
          <div className='form-group'>
            <input ref={ref} type='text' placeholder='' value='' onChange={() => onChange()}></input>
          </div>
          <button className='generate-color-btn' onClick={() => onClick()}>Generate</button>
        </div>
        <div className='colors-wrapper'>
          {bgColors.map((bgColor) => {
            return (
              < RandomBox key={bgColor} bgColor={bgColor} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App count={27} />
  </React.StrictMode>
);
