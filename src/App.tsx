import React from 'react';
import Head from './components/header/Head';
import Main from './components/content/Content';
import Side from './components/sider/Side';

import './App.less';

function App() {
  return (
    <div className="App">
      <div className='top'>
        <Head />
      </div>
      <div className='side-main'>
        <Side></Side>
        <Main></Main>
      </div>
    </div>
  );
}

export default App;
