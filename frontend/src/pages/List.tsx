import Footer from '../components/Footer'
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
          <div className='px-6 pb-6 bg-purple-500'>
            <ListTable/>
          </div>
          <div className='mt-auto bg-blue-500'>
            <Footer/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default List;