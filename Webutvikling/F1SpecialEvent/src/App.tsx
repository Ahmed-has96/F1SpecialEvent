import { DriverProvider } from "./context/DriversContext";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRouter from "./components/Shared/AppRouter";

function App() {
  return (
    <DriverProvider>
      <AppRouter />
    </DriverProvider>
  );
}

export default App;
