import "./main.css"; 
import TopMenu from "./react/components/nav/TopMenu";
import SortingAlgorithmsPage from './react/pages/sorting/SortingAlgorithmsPage';
import GraphAlgorithmsPage from "./react/pages/graphs/GraphAlgorithmsPage";
import TreeAlgorithmsPage from "@/pages/trees/TreeAlgorithmsPage";
import LinkedListAlgorithmsPage from "@/pages/linkedLists/LinkedListAlgorithmsPage";
import HomePage from "./react/pages/home/Home";
import {
  Routes,
  Route,
  Outlet,
  BrowserRouter,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <div className="App">

     <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="sorting" element={<SortingAlgorithmsPage />} />
        <Route path="graphs" element={<GraphAlgorithmsPage />} />
        <Route path="trees" element={<TreeAlgorithmsPage />} />
        <Route path="linkedLists" element={<LinkedListAlgorithmsPage />} />
      </Route>
    </Routes>
   </div>
   </BrowserRouter>
  );

  function Layout() {
    return (
      <div>
        <TopMenu />
        <div className="content">
          <Outlet />
        </div>
      </div>
    )
  }

}

export default App;