import ReactDom from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from 'src/modules/Home';

import 'src/styles/index.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/" />
      </Routes>
    </BrowserRouter>
  );
};

ReactDom.render(<App />, document.getElementById('root'));
