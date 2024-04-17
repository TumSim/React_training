import{Outlet} from "react-router-dom";
import NavigationDrawerbar from './Components/Appbar';


function App(){

  return(
    <>
    <div className='App'>
    <NavigationDrawerbar />
    </div>
    <Outlet />
    </>
  )
}


export default App
