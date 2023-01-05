import { Toaster } from 'react-hot-toast';
import './App.css';
import AllRoutes from './Router.jsx/AllRoutes';

function App() {
  return (
    <div className="App">
      <div>
        <Toaster position='top-right' 
        toastOptions={{
          success:{
            theme:{
              primary: 'c8f023'
            }
          }
        }}
        ></Toaster>
      </div>
      <AllRoutes/>
    </div>
  );
}

export default App;
