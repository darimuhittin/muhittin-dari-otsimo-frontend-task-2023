import ReactDOM from 'react-dom/client'
import routing from './routes/routing'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
// Queries fetched twice in StrictMode
// disabled to avoid potential misunderstandings
// root.render(<React.StrictMode>{routing}</React.StrictMode>)
root.render(routing)
