
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import './user.css';
import * as models from '../../models';

interface DetailsState {
    user: models.User;
    loading: boolean;
}

interface DetailsProps {
    //id: number
	id: number
}

export class Details extends React.Component<DetailsProps, DetailsState> {
    constructor(props) {
        super(props);
        this.state = { user: null, loading: true };
        //fetch('api/user/get/' + this.props.id)
		//fetch('api/user/get'  + '/' + id)
		fetch('api/user/get'  + '/' + this.props.id)
            .then(response => response.json() as Promise<models.User>)
            .then(data => {
                this.setState({ user: data, loading: false });
            });
    }
	
    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Details.renderDetails(this.state.user);
        return <div>
            <h1>User Details</h1>
            {contents}
        </div>;
    }

    private static renderDetails(item: models.User) {
        return <div className="details">
			<label>id</label>
			<div>{item.id}</div>
			<label>Name</label>
			<div>{item.Name}</div>
			<label>Email</label>
			<div>{item.Email}</div>
			<label>Address</label>
			<div>{item.Address}</div>
			<label>Phone Number</label>
			<div>{item.PhoneNumber}</div>

		</div>;
    }
}
