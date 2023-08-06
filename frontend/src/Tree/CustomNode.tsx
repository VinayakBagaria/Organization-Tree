import { ChangeEvent, useCallback } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

const handleStyle = { left: 10 };

interface ICustomNodeProps {
  data: NodeProps;
}

function CustomNode({ data }: ICustomNodeProps) {
  const onChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <p>Node at {data.id}</p>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}

export default CustomNode;
