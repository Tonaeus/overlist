import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className='flex flex-row h-14'>
      <div className='flex-1'></div>
      <div className='flex-1 flex justify-center items-center'>
        <Link to="/directory/" className="text-3xl font-bold">
          Overlist
        </Link>
      </div>
      <div className='flex-1'></div>
    </div>
  );
};

export default NavBar;
