import { Toaster } from "react-hot-toast";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import AllRoutes from "./Routes/AllRoutes";

function App() {
  return (
    <div className="App">
      <Toaster />
      <Navbar />
      <AllRoutes />
    </div>
  );
}

export default App;
