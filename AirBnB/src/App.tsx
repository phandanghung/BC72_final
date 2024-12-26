import useRouteElements from "./routes/useRouteElement";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Toaster } from 'react-hot-toast';


function App() {
  const { routes } = useRouteElements();
  return <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Toaster/>
    {routes}
  </LocalizationProvider>;
}

export default App;
