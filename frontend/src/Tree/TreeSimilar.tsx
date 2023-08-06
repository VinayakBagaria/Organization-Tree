import React, {
  useState,
  useRef,
  useCallback,
  DragEventHandler,
  useMemo,
} from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  Background,
  ReactFlowInstance,
  Connection,
  Edge,
  Node,
  useStoreApi,
  useReactFlow,
  Position,
  ConnectionLineType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from 'dagre';
import CustomNode from './CustomNode';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 60;
const nodeHeight = 36;

const getLayoutedElements = (
  nodes: Array<Node>,
  edges: Array<Edge>,
  direction = 'TB'
) => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach(node => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach(edge => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach(node => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const initialNodes = [
  {
    id: '1',
    type: 'customNode',
    // position: { x: 0, y: 0 },
    position: { x: 0, y: 0 },
    data: { label: '1' },
  },
  {
    id: '2',
    type: 'customNode',
    // position: { x: -200, y: 100 },
    position: { x: 0, y: 0 },
    data: { label: '2' },
  },
  {
    id: '3',
    type: 'customNode',
    // position: { x: 0, y: 100 },
    position: { x: 0, y: 0 },
    data: { label: '3' },
  },
  {
    id: '4',
    type: 'customNode',
    // position: { x: 200, y: 100 },
    position: { x: 0, y: 0 },
    data: { label: '4' },
  },
  {
    id: '5',
    type: 'customNode',
    // position: { x: -250, y: 200 },
    position: { x: 0, y: 0 },
    data: { label: '5' },
  },
  {
    id: '6',
    type: 'customNode',
    // position: { x: -75, y: 200 },
    position: { x: 0, y: 0 },
    data: { label: '6' },
  },
  {
    id: '7',
    type: 'customNode',
    // position: { x: 200, y: 200 },
    position: { x: 0, y: 0 },
    data: { label: '7' },
  },
  {
    id: '8',
    type: 'customNode',
    // position: { x: -150, y: 200 },
    position: { x: 0, y: 0 },
    data: { label: '8' },
  },
  {
    id: '9',
    type: 'customNode',
    // position: { x: 0, y: 200 },
    position: { x: 0, y: 0 },
    data: { label: '9' },
  },
  {
    id: '10',
    type: 'customNode',
    // position: { x: 75, y: 200 },
    position: { x: 0, y: 0 },
    data: { label: '10' },
  },
];

const initialEdges: Array<Edge> = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
  { id: 'e1-3', source: '1', target: '3', type: 'smoothstep' },
  { id: 'e1-4', source: '1', target: '4', type: 'smoothstep' },
  { id: 'e2-5', source: '2', target: '5', type: 'smoothstep' },
  { id: 'e2-8', source: '2', target: '8', type: 'smoothstep' },
  { id: 'e3-6', source: '3', target: '6', type: 'smoothstep' },
  { id: 'e3-9', source: '3', target: '9', type: 'smoothstep' },
  {
    id: 'e3-10',
    source: '3',
    target: '10',
    type: 'smoothstep',
  },
  { id: 'e4-7', source: '4', target: '7', type: 'smoothstep' },
];

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

const TreeSimilar = () => {
  const store = useStoreApi();
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);
  const { getIntersectingNodes } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges(eds =>
        addEdge({ ...params, type: ConnectionLineType.SmoothStep }, eds)
      ),
    []
  );

  const getClosestEdge = useCallback(
    (node: Node, alreadyTargets: Set<string>) => {
      const { nodeInternals } = store.getState();
      const storeNodes = Array.from(nodeInternals.values());

      interface IClosestNode {
        distance: number;
        node: Node | null;
      }

      const originalClosestNode: IClosestNode = {
        distance: Number.MAX_VALUE,
        node: null,
      };

      const closestNode = storeNodes.reduce((res, n) => {
        if (n.id === node.id) {
          return res;
        }

        if (alreadyTargets.size > 0 && alreadyTargets.has(n.id)) {
          return res;
        }

        const dx =
          (n.positionAbsolute?.x ?? 0) - (node.positionAbsolute?.x ?? 0);
        const dy =
          (n.positionAbsolute?.y ?? 0) - (node.positionAbsolute?.y ?? 0);
        const d = Math.sqrt(dx * dx + dy * dy);

        if (d < res.distance) {
          res.distance = d;
          res.node = n;
        }

        return res;
      }, originalClosestNode);

      if (!closestNode.node) {
        return null;
      }

      const closeNodeIsSource =
        (closestNode.node.positionAbsolute?.x ?? 0) <
        (node.positionAbsolute?.x ?? 0);

      return {
        id: `${node.id}-${closestNode.node.id}`,
        source: closeNodeIsSource ? closestNode.node.id : node.id,
        target: closeNodeIsSource ? node.id : closestNode.node.id,
        className: '',
      };
    },
    []
  );

  const onNodeDrag = useCallback(
    (node: Node) => {
      const intersections = getIntersectingNodes(node).map(n => n.id);
      const alreadyTargets = edges
        .filter(eachEdge => eachEdge.source === node.id)
        .map(eachEdge => eachEdge.target);

      const closeEdge = getClosestEdge(node, new Set(alreadyTargets));

      if (!closeEdge) {
        return;
      }

      if (!intersections.includes(closeEdge.source)) {
        return;
      }

      setNodes(nodes =>
        nodes.map(n => ({
          ...n,
          className: n.id === closeEdge.source ? 'highlight' : '',
        }))
      );

      setEdges(es => {
        const nextEdges = es.filter(e => e.className !== 'temp');
        nextEdges.push({
          id: `${closeEdge.source}-${node.id}`,
          source: closeEdge.source,
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

      let edgeToRealize: Edge | undefined;

      // delete edge where target is node but classname is not temp
      // if there is no temp, then let it be
      // cannot be a cycle
      setEdges(es => {
        // Since there is no temp edge, we have not modified the tree at all
        edgeToRealize = es.find(eachEdge => eachEdge.className === 'temp');

        if (!edgeToRealize) {
          return es;
        }

        console.log({ edgeToRealize });

        let validEdges: Array<Edge> = [];

        for (const e of es) {
          if (e.target === node.id && e.className !== 'temp') {
            continue;
          } else {
            validEdges.push({
              ...e,
              className: '',
              type: ConnectionLineType.SmoothStep,
            });
          }
        }

        return validEdges;
      });
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
      // nodeTypes={nodeTypes}
      fitView
    >
      <MiniMap />
      <Background />
    </ReactFlow>
  );
};

export default TreeSimilar;
