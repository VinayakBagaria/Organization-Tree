import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tree from './Tree';
import { useFetchData } from './hooks';
import Loader from './Loader';
import './App.css';

const App = () => {
  const { isLoading, initialNodes, initialEdges } = useFetchData();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <ReactFlowProvider>
        <Tree initialNodes={initialNodes} initialEdges={initialEdges} />
      </ReactFlowProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="light"
        hideProgressBar
      />
    </>
  );
};

export default App;
