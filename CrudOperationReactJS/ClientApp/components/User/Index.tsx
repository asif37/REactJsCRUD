import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as Modal from 'react-modal'
import { Pager, PagerProps } from '../Pager/Pager'
import { MyButton } from '../MyButton'
import * as models from '../../models'
import { CreateEdit } from './CreateEdit'
import { Details } from './Details'
import '../Validation/ValidationSummary.css'

interface UserState {
	user: models.User[]
    loading: boolean
    pager: PagerProps
    pagerLoading: boolean
    activeid: number
	showCreate: boolean
    showEdit: boolean
    showDetails: boolean
    sort?: string
    lastSort?: string
}

export class Users extends React.Component<RouteComponentProps<{}>, UserState> {
    constructor(props) {
        super(props);
        this.that = this;
        let pager: PagerProps = {
            TotalCount: 1,
            PageIndex: 0,
            PageSize: 7,
        }
        this.state = {
            user: [],
            loading: true,
            pager: pager,
            pagerLoading: true,
            showCreate: false,
            showDetails: false,
            showEdit: false,
			activeid: 0
        };
        fetch('api/user/indexinfo')
            .then(response => response.json() as Promise<PagerProps>)
            .then(data => {
                console.log("user.pager initing", this.state.pager)
                this.setState((prevState, props) => ({
                    pager: data,
                    pagerLoading: false
                }));
                console.log("user.pager inited", this.state.pager)
            });
        this.pagerClick({ pageIndex: 0, tag: this.state.sort })
    }//ctor

    that;
    //
    //handleDelete(id: number) {
	handleDelete(id: number) {
        if (!confirm('Are you sure you want to delete this record?'))
            return
		fetch('api/user/delete'  + '/' + id, { method: 'delete' })
            .then(response => response.json() as Promise<models.JsonResponse>)
            .then(data => {
                if (data.Success)
                    this.setState(
                        {
                            user: this.state.user.filter((rec) => {
								return (rec.id != id);
                            })
                        });
                else
                    alert('Error: ' + data.Message)
            });
    }
    //
    handleCreate() {
        console.log("index.handleCreate()")
        this.setState({ showCreate: true, showDetails: false, showEdit: false })
    }
	//
    handleEdit(id: number) {
        console.log("index.handleEdit(" + id + ")")
		this.setState({ showEdit: true, showDetails: false, showCreate: false, activeid: id })
    }
    //
    handleDetails(id: number) {
        console.log("index.handleDetails(" + id + ")")
		this.setState({ showDetails: true, showCreate: false, showEdit: false, activeid: id})
    }
    //
    closeModal() {
        this.setState({ showDetails: false, showCreate: false, showEdit: false });
    }
	//
    handlePopupSave(success: boolean) {
        if (success){
            this.setState({ showCreate: false, showEdit: false });
			//nw
		    this.setState({ sort: this.state.lastSort, lastSort: "" });
            this.pagerClick({ pageIndex: this.state.pager.PageIndex });
		}
    }

    //
    public render() {
        console.log('user.render', this.state, this.state.pager)
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderTable(this.state.user, true);
        let pager = this.state.pagerLoading
            ? <Pager />
            : <Pager buttonClick={this.pagerClick.bind(this)} {...this.state.pager} />
        let popup = this.renderPopup();
        return <div>
            <h1>User</h1>
            <button className="btn btn-primary" onClick={this.handleCreate.bind(this)}>Create</button>
            {contents}
            {pager}
            {popup}
        </div>;
    }
    //
    pagerClick(e) {
        console.log('user.pagerClick()', e, this.state)
        let sort = this.state.sort
        if (sort == this.state.lastSort)
            sort = this.toggleSort(sort)
        fetch('api/user/index?page=' + e.pageIndex + "&sort=" + (sort || ""))
			.then(response => response.json() as Promise<models.User[]>)
            .then(data => {
                this.setState({
                    user: data,
                    loading: false,
                    lastSort: sort
                });
            });
    }
    //
    handleSort(sort: string) {
        console.log("index.handleSort(" + sort + ")")
        console.log('pager state:', this.state.pager)
        var pagerState = this.state.pager
        pagerState.Tag = sort
        this.setState({
            sort: sort, loading: true, pager: pagerState
        }, () => {
            this.pagerClick({ pageIndex: this.state.pager.PageIndex, tag: sort });
        })
    }
    //
	private renderTable(user: models.User[], allowSort: boolean = false) {
        let headings = this.renderTableHeadings(allowSort)
		return <table className='table'>
            <thead>
                {headings}
            </thead>
            <tbody>
                {user.map(item =>
                    <tr key={item.id}>
                        
					<td>{item.id}</td>
					<td>{item.Name}</td>
					<td>{item.Email}</td>
					<td>{item.Address}</td>
					<td>{item.PhoneNumber}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => this.handleDelete(item.id)}>Delete</button>
                            <button className="btn btn-primary" onClick={() => this.handleEdit(item.id)}>edit</button>
                            <button className="btn btn-default" onClick={() => this.handleDetails(item.id)}>details</button>
                        </td>
					</tr>
                )}
            </tbody>
        </table>;

    }
    //
    private renderTableHeadings(allowSort: boolean) {
        if (allowSort) {
            debugger
            return <tr>
                <th></th>
				<th><MyButton buttonClick={this.handleSort.bind(this)} tag='Id'>Id</MyButton></th>
				<th><MyButton buttonClick={this.handleSort.bind(this)} tag='Name'>Name</MyButton></th>
				<th><MyButton buttonClick={this.handleSort.bind(this)} tag='Email'>Email</MyButton></th>
				<th><MyButton buttonClick={this.handleSort.bind(this)} tag='Address'>Address</MyButton></th>
				<th><MyButton buttonClick={this.handleSort.bind(this)} tag='PhoneNumber'>Phone Number</MyButton></th>

            </tr>
        }
        else {            
            return <tr>
                <th></th>
				<th>id</th>
				<th>Name</th>
				<th>Email</th>
				<th>Address</th>
				<th>Phone Number</th>

			</tr>
        }
    }
    //
    private renderPopup() {
        console.log('index.renderPopup()')
        if (!this.state.showCreate && !this.state.showDetails && !this.state.showEdit)
            return null
        return <Modal
            isOpen={true}
            contentLabel="Crawl">
            <button onClick={this.closeModal.bind(this)} className="action" title="close">X</button>
            {this.renderPopupContent()}
        </Modal>
    }
    //
    private renderPopupContent() {
        if (this.state.showCreate) {
            console.log('index.renderPopupContent(showCreate)')
			return <CreateEdit id={null} dbaction="create" onSave={this.handlePopupSave.bind(this)} />
        }
        if (this.state.showEdit) {
            console.log('index.renderPopupContent(showEdit)')
			return <CreateEdit id={this.state.activeid } dbaction="edit" onSave={this.handlePopupSave.bind(this)} />
        }
        if (this.state.showDetails) {
            console.log('index.renderPopupContent(showDetails)')
			return <Details id={this.state.activeid } />
        }
    }
    //
    /* Adds/Removes ' DESC' to sort*/
    private toggleSort(sort: string): string {
        console.log('index.toggleSort(' + sort + ')')
        if (sort == null || sort.length == 0)
            return sort
        let i = sort.indexOf(" DESC")
        if (i > 0)
            return sort.substr(0, i)
        return sort + " DESC"
    }
}//cls
