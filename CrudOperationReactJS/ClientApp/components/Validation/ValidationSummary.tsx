 
import * as React from 'react'
import { ValidationError } from '../../models'

interface ValidationSummaryProps {
    message?: string
    validationErrors: ValidationError[]
}
export class ValidationSummary extends React.Component<ValidationSummaryProps, any> {
    render() {
        return (
            (this.props.validationErrors != null) &&
            <div className='validation-summ'>
                <div>{this.props.message}</div>
                < ul >
                    {this.props.validationErrors.map(err =>
                        <li>{err.Value}</li>
                    )}
                </ul>
            </div>
        )
    }
}
