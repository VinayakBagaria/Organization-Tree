import React from 'react';
import TreeSimilar from './Tree/TreeSimilar';
import './App.css';
import { ReactFlowProvider } from 'reactflow';

const App = () => {
  return (
    <ReactFlowProvider>
      <TreeSimilar />
    </ReactFlowProvider>
  );
};

export default App;
