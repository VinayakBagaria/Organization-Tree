import { ChangeEvent, useCallback } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

interface ICustomNodeProps extends NodeProps<{ label: string }> {}

function CustomNode({ data }: ICustomNodeProps) {
  const onChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <Handle type="target" position={Position.Top} isConnectable={false} />
      <p>Node at {data.label}</p>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}

export default CustomNode;
