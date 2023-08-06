import React, { useState, useCallback, useMemo, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  MiniMap,
  Background,
  Connection,
  Edge,
  Node,
  useStoreApi,
  useReactFlow,
  ConnectionLineType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
import { getLayoutedElements } from './utils';
import { updateManagerForUser as updateManagerForUserApi } from '../api';

interface IClosestNode {
  distance: number;
  node: Node | null;
}

const ORIGINAL_CLOSEST_NODE: IClosestNode = {
  distance: Number.MAX_VALUE,
  node: null,
};

interface ITreeProps {
  initialNodes: Array<Node>;
  initialEdges: Array<Edge>;
}

const Tree = ({ initialNodes, initialEdges }: ITreeProps) => {
  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(
    () => getLayoutedElements(initialNodes, initialEdges),
    []
  );
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const store = useStoreApi();
  const { getIntersectingNodes } = useReactFlow();
  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isDragging) {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges);
      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    }
  }, [isDragging]);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges(eds =>
        addEdge({ ...params, type: ConnectionLineType.SmoothStep }, eds)
      ),
    []
  );

  const getClosestEdge = useCallback(
    (node: Node, alreadyTargetNodeIds: Set<string>) => {
      const { nodeInternals } = store.getState();
      const storeNodes = Array.from(nodeInternals.values());

      const closestNode = storeNodes.reduce((accumulator, eachNode) => {
        if (eachNode.id === node.id) {
          return accumulator;
        }
        if (
          alreadyTargetNodeIds.size > 0 &&
          alreadyTargetNodeIds.has(eachNode.id)
        ) {
          return accumulator;
        }

        const xDistance =
          (eachNode.positionAbsolute?.x ?? 0) - (node.positionAbsolute?.x ?? 0);
        const yDistance =
          (eachNode.positionAbsolute?.y ?? 0) - (node.positionAbsolute?.y ?? 0);
        const distanceBetweenNodes = Math.sqrt(
          xDistance * xDistance + yDistance * yDistance
        );
        if (distanceBetweenNodes < accumulator.distance) {
          accumulator.distance = distanceBetweenNodes;
          accumulator.node = eachNode;
        }
        return accumulator;
      }, ORIGINAL_CLOSEST_NODE);

      if (!closestNode.node) {
        return null;
      }

      const isClosestNodeSource =
        (closestNode.node.positionAbsolute?.x ?? 0) <
        (node.positionAbsolute?.x ?? 0);

      return {
        id: `${node.id}-${closestNode.node.id}`,
        source: isClosestNodeSource ? closestNode.node.id : node.id,
        target: isClosestNodeSource ? node.id : closestNode.node.id,
        className: '',
      };
    },
    []
  );

  const onNodeDrag = useCallback(
    (node: Node) => {
      setIsDragging(true);
      const intersections = getIntersectingNodes(node).map(
        eachNode => eachNode.id
      );
      const alreadyTargetNodes = edges
        .filter(eachEdge => eachEdge.source === node.id)
        .map(eachEdge => eachEdge.target);

      const closestEdge = getClosestEdge(node, new Set(alreadyTargetNodes));

      if (!closestEdge) {
        return;
      }

      if (!intersections.includes(closestEdge.source)) {
        return;
      }

      setNodes(previousNodes =>
        previousNodes.map(eachNode => ({
          ...eachNode,
          className: eachNode.id === closestEdge.source ? 'highlight' : '',
        }))
      );

      setEdges(previousEdges => {
        const nextEdges = previousEdges.filter(e => e.className !== 'temp');
        nextEdges.push({
          id: `${closestEdge.source}-${node.id}`,
          source: closestEdge.source,
          target: node.id,
          className: 'temp',
        });
        return nextEdges;
      });
    },
    [getClosestEdge, setEdges]
  );

  const onNodeDragStop = useCallback(
    (node: Node) => {
      setNodes(nodes =>
        nodes.map(eachNode => ({
          ...eachNode,
          className: '',
        }))
      );

      // delete edge where target is node but classname is not temp
      // if there is no temp, then let it be
      // cannot be a cycle
      setEdges(previousEdges => {
        // Since there is no temp edge, we have not modified the tree at all
        const edgeToRealize = previousEdges.find(
          eachEdge => eachEdge.className === 'temp'
        );
        if (!edgeToRealize) {
          return previousEdges;
        }

        updateManagerForUserApi(
          Number(edgeToRealize.target),
          Number(edgeToRealize.source)
        );

        let validEdges: Array<Edge> = [];
        for (const eachEdge of previousEdges) {
          if (eachEdge.target === node.id && eachEdge.className !== 'temp') {
            continue;
          } else {
            validEdges.push({
              ...eachEdge,
              className: '',
              type: ConnectionLineType.SmoothStep,
            });
          }
        }
        return validEdges;
      });

      setIsDragging(false);
    },
    [getClosestEdge]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeDrag={(_, node) => onNodeDrag(node)}
      onNodeDragStop={(_, node) => onNodeDragStop(node)}
      nodeTypes={nodeTypes}
      fitView
    >
      <MiniMap />
      <Background />
    </ReactFlow>
  );
};

export default Tree;
