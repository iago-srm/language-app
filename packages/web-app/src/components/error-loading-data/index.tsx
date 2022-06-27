import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { SpinnerContainer } from './styles';

const defaultLoading = (
  <SpinnerContainer>
    <Spinner animation="border" role="status">
    </Spinner>
  </SpinnerContainer>
);
const defaultError = (
  <h3>There's been an error!</h3>
);
const defaultNoData = (
  <h3>There's no data!</h3>
);

export const LoadingErrorData = ({ loading, error, data, children }) => {

  const parseChildren = () => {
    const c = {
      noData: [],
      error: [],
      loading: [],
      other: []
    };

    React.Children.map(children, (Child, i) => {
      if(Child) switch(Child.type.name) {
        case "NoData":
          c.noData.push(<React.Fragment key={i}>{Child}</React.Fragment>);
          break;
        case "Error":
          c.error.push(<React.Fragment key={i}>{Child}</React.Fragment>);
          break;
        case "Loading":
          c.loading.push(<React.Fragment key={i}>{Child}</React.Fragment>);
          break;
       default:
          c.other.push(<React.Fragment key={i}>{Child}</React.Fragment>);
          break;
      }
    });

    if(!c.error.length) c.error.push(<React.Fragment key={1}>{defaultError}</React.Fragment>);
    if(!c.loading.length) c.loading.push(<React.Fragment key={1}>{defaultLoading}</React.Fragment>);
    if(!c.noData.length) c.noData.push(<React.Fragment key={1}>{defaultNoData}</React.Fragment>);

    return c;
  }

  return (
    <>
      {loading && !data && !error && <LoadingErrorData.Loading>{parseChildren().loading}</LoadingErrorData.Loading>}
      {!data && !loading && error && <LoadingErrorData.Error>{parseChildren().error}</LoadingErrorData.Error>}
      {!loading && !error && !data && <LoadingErrorData.NoData>{parseChildren().noData}</LoadingErrorData.NoData>}
      {!loading && data && children && parseChildren().other}
    </>
  );
};

const Error = ({children}) => children;
LoadingErrorData.Error = Error;

const Loading = ({children}) => children;
LoadingErrorData.Loading = Loading;

const NoData = ({children}) => children;
LoadingErrorData.NoData = NoData;

