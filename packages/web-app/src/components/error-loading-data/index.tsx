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

  const parseChildren = (children) => {

    const c = {
      noData: [],
      error: [],
      loading: [],
      other: []
    };

    React.Children.map(children || [], (child) => {
      switch(child.type.name) {
        case "NoData":
          c.noData.push(child);
          break;
        case "Error":
          c.error.push(child);
          break;
        case "Loading":
          c.loading.push(child);
          break;
       default:
          c.other.push(child);
          break;
      }
    });

    if(!c.error.length) c.error.push(defaultError);
    if(!c.loading.length) c.loading.push(defaultLoading);
    if(!c.noData.length) c.loading.push(defaultNoData);

    return c;
  }

  const childrenParsed = React.useMemo(() => {
    return parseChildren(children)
  }, [children]);

  return (
    <>
      {loading && !data && !error && <LoadingErrorData.Loading>{childrenParsed.loading}</LoadingErrorData.Loading>}
      {!data && !loading && error && <LoadingErrorData.Error>{childrenParsed.error}</LoadingErrorData.Error>}
      {!loading && !error && !data && <LoadingErrorData.NoData>{childrenParsed.noData}</LoadingErrorData.NoData>}
      {!loading && data && children && childrenParsed.other}
    </>
  );
};

const Error = ({children}) => children;
LoadingErrorData.Error = Error;

const Loading = ({children}) => children;
LoadingErrorData.Loading = Loading;

const NoData = ({children}) => children;
LoadingErrorData.NoData = NoData;

