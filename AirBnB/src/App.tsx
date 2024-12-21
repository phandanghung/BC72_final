import useRouteElements from "./routes/useRouteElement";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


function App() {
  const { routes } = useRouteElements();
  return <LocalizationProvider dateAdapter={AdapterDayjs}>{routes}</LocalizationProvider>;
}

export default App;
