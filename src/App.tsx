import React from 'react';
import logo from './logo.svg';
import './App.css';
import { RouteComponentProps, Link, Switch, Route } from 'react-router-dom';
import CreateCustomer from './components/customer/CreateCustomer';
import Home from './components/Home';

const App: React.FC = () => {
  return (
    <div>
        <nav>
          <ul>
            <li>
              <Link to={'/'}> Home </Link>
            </li>
            <li>
              <Link to={'/create'}> Create Customer </Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path={'/create'} exact component={CreateCustomer} />
          <Route path={'/'} exact component={Home} />
        </Switch>
      </div>
  );
}

export default App;
