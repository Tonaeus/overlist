import Footer from "../components/Footer"
import HomeSideBar from "../components/HomeSideBar"
import HomeTable from "../components/HomeTable"

const Home = () => {
  return (
    <div className='page h-[calc(100vh-4rem)]'>
      <div className='page-side-bar'>
        <HomeSideBar/>
      </div>
      <div className='page-content'>
        <div className='flex flex-col min-h-screen'>
          <div className='p-6 bg-purple-500'>
            <HomeTable/>
          </div>
          <div className='mt-auto bg-blue-500'>
            <Footer/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home