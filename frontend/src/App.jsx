import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useState } from 'react'

function App() {

  const [prodotti, setProdotti] = useState("")

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Pizzeria</h1>
      <div className="card">
        <button 
          onClick={ async () => {
            try {
              const res = await fetch("http://localhost:3000/prodotti")
              const data = await res.json()
              console.log(data)
              setProdotti(data)
            } catch (error) {
              console.error("Errore nel fetch", error)
            }
          }}>
          Elenco Ordini
        </button>
        <button onClick={() => console.log("Crea nuovo Ordine")}>
          Crea nuovo ordine
        </button>
      </div>
    </>
  )
}

export default App
