import * as s from 'css/read.scss'
import { Component, h } from 'preact'
import autobind from 'autobind-decorator';
import TopAppBar from 'preact-material-components/TopAppBar'
import { Link, route } from 'preact-router'



interface Props {
    id: string
    show: boolean
    onClose: () => void
}

export default class MetaModal extends Component<Props, {}>  {
    private slider: HTMLInputElement

    public render() {
        // Render nothing if the "show" prop is false
        if(!this.props.show) {
            return null
        }

        let backButton = <TopAppBar.Icon />

        return <div className={s.backdrop}>
            <div className="modal">
                Some Text
            </div>
        </div>
    }

    @autobind
    private updateSlider() {
        console.log(this.slider.value)
    }

    @autobind
    private toggleMeta() {

    }
}
