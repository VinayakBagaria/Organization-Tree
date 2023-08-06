import { Node, Edge, Position } from 'reactflow';
import dagre from 'dagre';
import { NODE_CONFIG } from '../constants';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export function getLayoutedElements(nodes: Array<Node>, edges: Array<Edge>) {
  dagreGraph.setGraph({ rankdir: 'TB' });

  nodes.forEach(node => {
    dagreGraph.setNode(node.id, {
      width: NODE_CONFIG.width,
      height: NODE_CONFIG.height,
    });
  });

  edges.forEach(edge => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach(node => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = Position.Top;
    node.sourcePosition = Position.Bottom;

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - NODE_CONFIG.width / 2,
      y: nodeWithPosition.y - NODE_CONFIG.height / 2,
    };

    return node;
  });

  return { nodes, edges };
}
