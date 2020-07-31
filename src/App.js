import React from 'react';
import Header from './Header/Header'
import Main from './Main/Main'

const App = () => {
  console.log('API key:', process.env.REACT_APP_TMDB_API_KEY);
  return (
    <div>
      <Header />
      <Main />
    </div>
  )
}

export default App;