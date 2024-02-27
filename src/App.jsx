import { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { Navigation } from './components/NavBar';
import { BodyList } from './components/BodyList';


function App() {
  const [state, setState] = useState( { label: []})
  const updateLabel = (arr) => {
   setState({ label: arr })
  }
 
  return (
    <>
       <CssBaseline />
      <Navigation label = {state.label}/>
      <BodyList updateLabel={updateLabel}/>

    </>
  )
}

export default App
