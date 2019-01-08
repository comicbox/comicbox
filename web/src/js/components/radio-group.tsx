import { Component, h, VNode } from 'preact'
import FormField from 'preact-material-components/FormField'
import Radio from 'preact-material-components/Radio'

interface Props extends JSX.HTMLAttributes {
    name: string
    children: Array<VNode<RadioOptionProps>>
}

export default class RadioGroup extends Component<Props> {
    public render() {
        if (!(this.props.children instanceof Array)) { return <div /> }
        const controlledRadioElements = this.props.children.map((child, i) => {

            child.attributes._id = `${this.props.id || this.props.name}-${i}`
            child.attributes._name = this.props.name
            child.attributes._pValue = this.props.value

            return child
        })

        return <div {...this.props}>{controlledRadioElements}</div>
    }
}

interface RadioOptionProps {
    value: string | number | string[]
    _pValue?: string | number | string[]
    _id?: string
    _name?: string
}
// tslint:disable-next-line:max-classes-per-file
export class RadioOption extends Component<RadioOptionProps> {
    public render() {
        return <FormField key={this.props._id! + this.props.value} class='option'>
            <Radio
                id={this.props._id}
                name={this.props._name}
                checked={this.props.value === this.props._pValue}
            />
            <label for={this.props._id}>{this.props.children}</label>
        </FormField>
    }
}
