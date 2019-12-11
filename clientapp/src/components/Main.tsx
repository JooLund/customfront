import React from 'react';

interface Props {
    children : any
  }

const Main : React.FC<Props> = (props : Props) => {
    return (
        <>
            {props.children}
        </>
    )
}

export default Main;
