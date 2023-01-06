import logo from './logo.svg';
import './App.css';
import Signin from './Component/Signin';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Todo from './Component/Todo';
import Edit from './Component/Edit';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signin/>}/>
         <Route path="/todo" element={<Todo/>}/>
         <Route path="/todo/edit/:id" element={<Edit/>}/>
         {/* <Route path="/home/about" element={<About />} />
          <Route path="/home/resume" element={<Resume />} />
          <Route path="/home/contact" element={<Contact />} />
          <Route path="/home/project" element={<Project />} />
        </Route> */}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
