import './App.css';
import SchedList from './components/SchedList';
import Semester from './components/Semester';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import AddStudent from './components/AddStudent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Switch>
        <Route exact path='/' component={Semester} />
        <Route path='/schedule' component={SchedList} />
        <Route path='/student' component={Semester} />
       </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;