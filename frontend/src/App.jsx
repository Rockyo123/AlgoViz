import { useState, useEffect } from "react";
import "./App.css"; 
import LeftSideNav from "./react/components/menus/LeftSideNav";
import TopMenu from "./react/components/menus/TopMenu";
import SortingAlgorithmsPage from './react/pages/sorting/SortingAlgorithmsPage'
import HomePage from "./react/pages/Home";
import {
  Routes,
  Route,
  Outlet,
  BrowserRouter,
} from "react-router-dom";


function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/api");
      const data = await response.text();
      setData(data);
    };

    fetchData().catch((err) => console.log(err));
  }, []);



  return (
    <BrowserRouter>
    <div className="App">

     <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<SortingAlgorithmsPage />} />
        <Route path="sorting" element={<SortingAlgorithmsPage />} />
      </Route>
    </Routes>
   </div>
   </BrowserRouter>
  );

  function Layout() {
    return (
      <div>
        <TopMenu />
        <LeftSideNav />
        <Outlet />
      </div>
    )
  }

}

export default App;