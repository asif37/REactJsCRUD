 
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import './user.css';
import {User} from '../../models'
import * as models from '../../models'
import { formToJson } from '../../utils'
import { ValidationSummary } from '../Validation/ValidationSummary'
import '../Validation/ValidationSummary.css'

interface CreateEditState {
    user: User;
    loading: boolean;
	save: boolean
    jsonResponse?: models.JsonResponse
}

interface CreateEditProps {
    //id: number
	id: number
    dbaction: string
    onSave?: any /* event; returns bool*/
}

export class CreateEdit extends React.Component<CreateEditProps, CreateEditState> {
    constructor(props) {
        super(props);
        if (this.props.dbaction == "edit") {
			this.state = { user: null, loading: true, save: false }
             
			fetch('api/user/get'  + '/' + this.props.id, { method: 'get' })
                .then(response => response.json() as Promise<User>)
                .then(data => {
                    this.setState({ user: data, loading: false });
                });
        } else
			this.state = { user: null, loading: false, save: false}
    }
	
    handleSave(e) {
        e.preventDefault()
        console.log('createedit.handleSave()', this.props.dbaction)
        let meth: string = (this.props.dbaction == "edit" ? "put" : "post")
        let form: Element = document.querySelector('#frmCreateEdit')
        console.log(formToJson(form))
        //let id = document.getElementById('Id') as HTMLInputElement
		fetch('api/user/' + meth,
            {
                method: meth,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formToJson(form))
            })
            .then(response => response.json() as Promise<models.JsonResponse>)
            .then(data => {
                if (data.Success){
					this.setState({ save: false, jsonResponse: data });
                    this.props.onSave(true);
                }
                else
					this.setState({ jsonResponse: data })
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
			: this.renderForm(this.state.user);
        let validation = (this.state.jsonResponse != null) &&
            <ValidationSummary message={this.state.jsonResponse.Message} validationErrors={this.state.jsonResponse.ValidationErrors} />;
        return <div>
            <h1>{this.props.dbaction == "edit" ? "Edit User" : "Create User"}</h1>
            {validation}
            {contents}
        </div>;
    }

    private renderForm(item: User) {
        console.log('CreateEdit.renderForm(' + item + ')')
        if (this.props.dbaction != "edit")
            item = new User()
		return <form id='frmCreateEdit'>
			<label>id</label>
			{this.props.dbaction == 'edit' ? <input id='id' name='id' type='hidden' value={item.id} /> : <input id='id' name='id' type='text' />}
			<label>Name</label>
			<input id='Name' name='Name' type='text' defaultValue={item.Name!=null ? (item.Name + '') : ''} />
			<label>Email</label>
			<input id='Email' name='Email' type='text' defaultValue={item.Email!=null ? (item.Email + '') : ''} />
			<label>Address</label>
			<input id='Address' name='Address' type='text' defaultValue={item.Address!=null ? (item.Address + '') : ''} />
			<label>Phone Number</label>
			<input id='PhoneNumber' name='PhoneNumber' type='text' defaultValue={item.PhoneNumber!=null ? (item.PhoneNumber + '') : ''} />

            <button onClick={this.handleSave.bind(this)} >Submit</button>
        </form>;
    }
}
