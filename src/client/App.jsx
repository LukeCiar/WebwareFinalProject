import { Outlet } from "react-router-dom";
import Topbar from "./components/Topbar";

//WONT WORK IF UNCOMMENTED - can't have asyc components, need to declare async inner functions that are called by other stuff
//   response = await fetch("/add", {
//     method:"POST",
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({name: "Catan", description: "Good game"})
//   })

function App() {
  return (
    <>
      <Topbar />
      <Outlet />
    </>
  );
}

export default App;
