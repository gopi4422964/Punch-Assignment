import React from 'react';
import LoadingIndicator from './LoadingIndicator';

const loaderHoc = Comp => ({ isLoading, children, ...props }) => {
  if (isLoading) {
    return <LoadingIndicator isLoading={isLoading} />
  } else {
    return (
      <Comp {...props}>
        {children}
      </Comp>
    )
  }
};

export default loaderHoc;