import ButtonAppBar from './Components/Appbar';
import{Outlet} from "react-router-dom";

function App(){

  return(
    <>
    <div className='App'>
    <ButtonAppBar />
    </div>
    <Outlet />
    </>
  )
}


export default App
