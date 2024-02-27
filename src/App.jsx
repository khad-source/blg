import { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { Navigation } from './components/NavBar';
import { BodyList } from './components/BodyList';
import { BrowserRouter } from 'react-router-dom';


function App() {
  const [state, setState] = useState( { label: []})
  const updateLabel = (arr) => {
   setState({ label: arr })
  }
 
  return (
    <>
       <CssBaseline />
       <BrowserRouter>
      <Navigation label = {state.label}/>
      <BodyList updateLabel={updateLabel}/>
      </BrowserRouter>
    </>
  )
}

export default App
