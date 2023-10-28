import { useState } from 'react'
import './App.css'
import { GeneralSection } from './components/GeneralSection.jsx'
import { EducationSection } from './components/EducationSection.jsx'
import { PracticalSection } from './components/PracticalSection'

function App() {
  return (
    <>
    <GeneralSection />
    <EducationSection />
    <PracticalSection />
    </>
  )
}

export default App
