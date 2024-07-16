
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Router/router';

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='bg-[#E2136D] lg:h-screen md:h-screen h-full'>
    <div className='max-w-[500px] mx-auto'>
    <RouterProvider router={router}>
    <App />
  </RouterProvider>,
  </div>
  </div>
)
