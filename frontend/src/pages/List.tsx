import Footer from '../layouts/Footer'
import ListSideBar from '../components/ListSideBar'
import ListTable from '../components/ListTable'

const List = () => {
  return (
    <div className='page h-[calc(100vh-4rem)]'>
      <div className='page-side-bar'>
        <ListSideBar/>
      </div>
      <div className='page-content'>
        <div className='flex flex-col min-h-screen'>
          <div className='p-6 bg-purple-500'>
            <ListTable/>
          </div>
          <div className='mt-auto mx-6 border-t border-line'>
            <Footer/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default List;