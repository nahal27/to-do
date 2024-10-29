import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import TodoList from "./components/todoList";
import Login from "./components/Login";

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden">
    
    <Router>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login/>} />

      </Routes>
    </Router>
    </div>
  );
}

export default App;
