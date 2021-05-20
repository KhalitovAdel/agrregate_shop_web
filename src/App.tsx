import './App.css';

import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import React from 'react';

import { CrudR } from './CRUD/crud.r';

class App extends React.Component<any, any> {
    render() {
        return (
          <ScopedCssBaseline>
            <p style={{ width: '100%', backgroundColor: 'red' }}>Lol kek</p>
            {/* <CrudList method={(arg: any) => Promise.resolve(arg)} /> */}
            <CrudR />
            <p style={{ width: '100%', backgroundColor: 'red' }}>Lol kek</p>
          </ScopedCssBaseline>
        );
    }
}

export default App;
