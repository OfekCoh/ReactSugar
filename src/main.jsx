// react code/component needs to end in .jsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App.jsx' // where the react code lives
import { GlobalProvider } from './contexts/globalContext';


createRoot(document.getElementById('root')).render(  // get root div from index.html and throw everythin in App into it
  <StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>,
)
