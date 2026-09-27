import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

createRoot(document.getElementById('root')).render(<App />)

const boot = document.getElementById('boot')
// hold the loader until 5s after navigation start, counting time already spent loading
setTimeout(() => {
  boot.classList.add('done')
  setTimeout(() => boot.remove(), 500)
}, Math.max(0, 5000 - performance.now()))
