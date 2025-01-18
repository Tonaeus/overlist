import HomeSideBar from '../components/HomeSideBar'

const Home = () => {
  return (
    <div className='page'>
      <div className='page-side-bar'>
        <HomeSideBar/>
      </div>
      <div className='page-content'>
        Content
      </div>
    </div>
  )
}

export default Home