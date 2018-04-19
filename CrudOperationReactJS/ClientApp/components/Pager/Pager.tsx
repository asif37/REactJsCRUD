 
import * as React from 'react';
import newId from '../../utils'

import './Pager.css'

export interface PagerProps {
    TotalCount?: number
    PageIndex?: number 
    PageSize?: number
    buttonClick?: any
    Tag?: string
}

export interface PagerState {
    PageCount: number
    PageIndex: number
    PageSize: number
    IsPreviousPage: boolean
    IsNextPage: boolean
    Tag?: string
}
//
export class Pager extends React.Component<PagerProps, PagerState> {
    private that;

	//
    constructor(props) {
        super(props);

        console.log('pager.props', props)
        this.that = this;
        this.state = this.toState(this.props)
    }//ctor
	
	//
    private toState(props: PagerProps): PagerState {
        console.log('toState()', props)
        let hasTotalPageSize = (props.TotalCount && props.PageSize)
        let pageCount = Math.ceil(hasTotalPageSize ? props.TotalCount / props.PageSize : 1)
        return {
            PageCount: pageCount,
            PageIndex: 0,
            PageSize: props.PageSize || 8,
            IsPreviousPage: false,
            IsNextPage: (pageCount > 1 ? true : false),
            Tag: props.Tag
        }
    }
	//
    componentWillReceiveProps(nextProps: PagerProps) {
        console.log('pager.componentWillReceiveProps', nextProps)
        if (nextProps.TotalCount !== this.props.TotalCount) { 
            console.log('props have changed')
            this.setState(this.toState(nextProps))
        }
    }
    //
    handleFocus(e) {
        e.target.select();
    }
	
	//
    public render() {
        return <div className="pager">
            <PagerBtn buttonClick={this.buttonClick.bind(this)} buttonId="first" >First</PagerBtn>
            <PagerBtn buttonClick={this.buttonClick.bind(this)} buttonId="prev" >&lt;</PagerBtn>
            <div className='page-of'>Page <input key={newId("inpPage")} type='text' value={this.state.PageIndex + 1}
                onChange={this.pageNoChange.bind(this)} onFocus={this.handleFocus} /> of {this.state.PageCount}</div>
            <PagerBtn buttonClick={this.buttonClick.bind(this)} buttonId="next">&gt;</PagerBtn>
            <PagerBtn buttonClick={this.buttonClick.bind(this)} buttonId="last">Last</PagerBtn>
        </div>;
    }
    //
    /*This is the PagerBtn handler*/
    buttonClick(btn) {
        switch (btn) {
            case "first":
                console.log('pager.first')
                this.first();
                break;
            case "prev":
                console.log('pager.prev')
                this.decrementPage();
                break;
            case "next":
                console.log('pager.next')
                this.incrementPage();
                break;
            default:
                console.log('pager.last')
                this.last();
                break;
        }
    }

    //
    /* Called when user types a 'go to' page no.*/
    pageNoChange(e) {
        console.log('pager.pageNoChange(' + e.target.value + ')', this.state)
        let idx = parseInt(e.target.value) - 1
        if (idx >= 0 && idx < this.state.PageCount) {
            if (idx == 0) {
                this.first()
            }
            if (idx == (this.state.PageCount - 1)) {
                this.last()
            }
            this.setState({
                PageIndex: idx,
                IsPreviousPage: true,
                IsNextPage: (idx < (this.state.PageCount - 2) ? true : false)
            }, () => { this.props.buttonClick({ pageIndex: idx, tag: this.state.Tag }); });
        }
    }


    //
    incrementPage() {
        console.log('pager.incrementPage()', this.state)
        if (this.state.IsNextPage) {
            this.setState({
                PageIndex: this.state.PageIndex + 1,
                IsPreviousPage: true,
                IsNextPage: (this.state.PageIndex < (this.state.PageCount - 2) ? true : false)
            }, () => { this.props.buttonClick({ pageIndex: this.state.PageIndex, tag: this.state.Tag }); });
        }
    }

    //
    decrementPage() {
        console.log('pager.decrementPage()', this.state)
        if (this.state.IsPreviousPage) {
            this.setState({
                PageIndex: this.state.PageIndex - 1,
                IsNextPage: true,
                IsPreviousPage: (this.state.PageIndex > 1 ? true : false)
            }, () => { this.props.buttonClick({ pageIndex: this.state.PageIndex, tag: this.state.Tag }); });
        }
    }

    //
    pageOf() {
        return "Page " + (this.state.PageIndex + 1) + " of " + (this.state.PageCount);
    }

    //
    first() {
        console.log('pager.first()', this.state)
        this.setState({
            PageIndex: 0,
            IsNextPage: (this.state.PageCount > 1 ? true : false),
            IsPreviousPage: false
        }, () => { this.props.buttonClick({ pageIndex: this.state.PageIndex, tag: this.state.Tag }); });
    }

    //
    last() {
        console.log('pager.last()', this.state)
        this.setState({
            PageIndex: this.state.PageCount - 1,
            IsNextPage: false,
            IsPreviousPage: (this.state.PageCount > 1 ? true : false)
        }, () => { this.props.buttonClick({ pageIndex: this.state.PageIndex, tag: this.state.Tag }); });
    }

} 
/*
    Start pagerBtn
*/
interface PagerBtnProps {
    buttonId: string
    buttonClick: any
}

export class PagerBtn extends React.Component<PagerBtnProps, any> {

    constructor(props) {
        super(props);

        this.buttonClick = this.buttonClick.bind(this);
    }
    buttonClick(id) {
        this.props.buttonClick(this.props.buttonId);
    }

    render() {
        return (
            <button onClick={this.buttonClick}>{this.props.children}</button>
        );
    }
}

export default Pager;