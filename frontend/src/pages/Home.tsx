import Footer from "../layouts/Footer"
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
          <div className='p-6'>
            <HomeTable/>
          </div>
          <div className='mt-auto mx-6 border-t border-line'>
            <Footer/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home