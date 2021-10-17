import './App.css';
import Login from './components/Login';
import Admin from './components/Admin';
import SchedList from './components/SchedList';
import Semester from './components/Semester';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import AddStudent from './components/AddStudent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Switch>         
        <Route exact path='/' component={Login} />
        <Route exact path='/semester' component={Semester} />
        <Route path='/schedule' component={SchedList} />
        <Route path='/admin' component={Admin} />
       </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;