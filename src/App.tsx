import React from 'react';
import logo from './logo.svg';
import './App.css';
import { RouteComponentProps, Link, Switch, Route } from 'react-router-dom';
import CreateCustomer from './components/customer/CreateCustomer';

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
        </Switch>
      </div>
  );
}

export default App;
