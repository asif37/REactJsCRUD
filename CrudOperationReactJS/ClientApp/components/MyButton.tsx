import * as React from 'react'

interface MyButtonProps {
    tag: string
    buttonClick: any
}

export class MyButton extends React.Component<MyButtonProps, any> {

    constructor(props) {
        super(props);

        this.buttonClick = this.buttonClick.bind(this);
    }
    buttonClick(tag) {
        this.props.buttonClick(this.props.tag);
    }

    render() {
        return (
            <button onClick={this.buttonClick}>{this.props.children}</button>
        );
    }
}
