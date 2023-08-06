import React from 'react';
import Tree from './Tree';
import './App.css';
import { ReactFlowProvider } from 'reactflow';
import { useFetchData } from './hooks';

const App = () => {
  const { isLoading, initialNodes, initialEdges } = useFetchData();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <ReactFlowProvider>
      <Tree initialNodes={initialNodes} initialEdges={initialEdges} />
    </ReactFlowProvider>
  );
};

export default App;
