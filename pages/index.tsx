import type { NextPage } from 'next'
import Footbar from '../components/appbar/Footbar'
import NavBar from '../components/appbar/Navbar'

const Home: NextPage = () => {
  return (
    <div>
      <NavBar />
      <Footbar />
    </div>
  )
}

export default Home
