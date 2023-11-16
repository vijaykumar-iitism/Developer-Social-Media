import { BrowserRouter as Router } from "react-router-dom";
import { useEffect} from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./AllRoutes";
import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch all questions action it is parameter because it request from data 
    //when use dipatch then this useeffect will run then this dependency array also
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
  }, [dispatch]);

 
 

  return (
    <div className="App">
      <Router>
        <Navbar />
        <AllRoutes  />
      </Router>
    </div>
  );
}

export default App;
