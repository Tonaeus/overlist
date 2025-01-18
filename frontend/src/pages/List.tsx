import ListSideBar from '../components/ListSideBar'
import ListTable from '../components/ListTable'

const List = () => {
  return (
    <div className='page'>
      <div className='page-side-bar'>
        <ListSideBar/>
      </div>
      <div className='page-content'>
        <ListTable/>
      </div>
    </div>
  )
}

export default List