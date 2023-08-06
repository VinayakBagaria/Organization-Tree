import { useEffect, useState } from 'react';
import { Edge, Node, ConnectionLineType } from 'reactflow';
import { IOrganizationUser } from './types';
import { fetchTreeApi } from './api';

export function useFetchData() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialNodes, setInitialNodes] = useState<Array<Node>>([]);
  const [initialEdges, setInitialEdges] = useState<Array<Edge>>([]);

  function formatDataToDesiredType(responseUsers: Array<IOrganizationUser>) {
    const rawPeopleNodes: Array<Node> = [];
    const rawPeopleEdges: Array<Edge> = [];

    for (const eachUser of responseUsers) {
      rawPeopleNodes.push({
        id: `${eachUser.id}`,
        type: 'customNode',
        position: { x: 0, y: 0 },
        data: eachUser,
      });

      if (eachUser.manager_id) {
        rawPeopleEdges.push({
          id: `e${eachUser.manager_id}-${eachUser.id}`,
          source: `${eachUser.manager_id}`,
          target: `${eachUser.id}`,
          type: ConnectionLineType.SmoothStep,
        });
      }
    }

    setInitialNodes(rawPeopleNodes);
    setInitialEdges(rawPeopleEdges);
  }

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const responseUsers = await fetchTreeApi();
      formatDataToDesiredType(responseUsers);
      setIsLoading(false);
    }

    setTimeout(() => fetchData(), 2000);
  }, []);

  return {
    isLoading,
    initialNodes,
    initialEdges,
  };
}
