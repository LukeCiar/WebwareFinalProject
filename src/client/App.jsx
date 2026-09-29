import { Outlet } from "react-router-dom";
import Topbar from "./components/Topbar";

function App() {
  return (
    <>
      <Topbar />
      <Outlet />
    </>
  );
}

export default App;
