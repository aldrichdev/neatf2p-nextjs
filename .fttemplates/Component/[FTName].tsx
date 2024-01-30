import { [FTName]Props } from './[FTName].types';

const [FTName] = (props: [FTName]Props) => {
  const { prop1, prop2 } = props;
  
  return <div>[FTName]</div>;
}

export default [FTName];
