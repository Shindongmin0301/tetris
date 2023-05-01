import { Route, Routes } from 'react-router-dom'
import ReactHotToast from './components/ReactHotToast'
import FlexPractice from './components/FlexPractice'
import './index.css'
import Responsive from './components/Responsive'

export default function App() {
  return (
    <Routes>
      <Route path='/toast' element={<ReactHotToast />} />
      <Route path='/flex' element={<FlexPractice />} />
      <Route path='/responsive' element={<Responsive />} />
    </Routes>
  )
}
