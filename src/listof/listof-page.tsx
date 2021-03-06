import { useSelector } from 'react-redux';
import ListofPageBase from './listof-page-base';

export default () => {
  const root = useSelector((state) => state.listofpage);
  return <ListofPageBase {...root} />;
};
