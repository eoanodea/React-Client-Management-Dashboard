import React from 'react';
import { Spinner } from 'reactstrap';

export class  IsLoading extends React.Component {
    render() {
        return <Spinner className="isLoadingComponent" color="primary" />;
    }
}