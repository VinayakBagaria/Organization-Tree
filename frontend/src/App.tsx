import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';
import EmptyView from './EmptyView';
import Tree from './Tree';
import { useFetchData } from './hooks';
import './App.css';

const App = () => {
  const { isLoading, initialNodes, initialEdges } = useFetchData();

  if (isLoading) {
    return <Loader />;
  }

  if (initialNodes.length === 0) {
    return <EmptyView />;
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
