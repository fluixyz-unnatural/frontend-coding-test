import React from 'react'
import Header from './components/Header'
import PrefsPopulationViewer from './components/PrefsPopulationViewer'
import './style.css'

function App() {
  return (
    <div>
      <Header />
      <section className={'container'}>
        <PrefsPopulationViewer />
      </section>
    </div>
  )
}

export default App
