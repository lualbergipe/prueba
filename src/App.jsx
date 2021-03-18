
import React from 'react';
import Tabla from './screens/tabla'
import { Routes, Route } from 'react-router';
import AgregarData from './screens/agregarData';
function App() {
  return (
<Routes>
      <Route path="/" element={<Tabla />} />
      <Route path="agregarData" element={<AgregarData/>}/>
</Routes>
  );
}

export default App;
