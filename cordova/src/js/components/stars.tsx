import autobind from 'autobind-decorator'
import { Component, h } from 'preact'
import Icon from 'preact-material-components/Icon'

interface Props {
    rating: number
    onClickStar: (rating: number) => void
}

export default class Stars extends Component<Props & JSX.HTMLAttributes> {
    
    public render() {
        const rating = this.props.rating * 2
        const stars: JSX.Element[] = []
        for (let i = 1; i <= 10; i += 2) {
            if (rating > i) {
                stars.push(<Icon onClick={this.onClick}>star</Icon>)
            } else if (rating > i - 1) {
                stars.push(<Icon onClick={this.onClick}>star_half</Icon>)
            } else {
                stars.push(<Icon onClick={this.onClick}>star_border</Icon>)
            }

        }
        return <span {...this.props}>
            {stars}
        </span>
    }

    @autobind
    private onClick(e: MouseEvent) {
        if (this.props.onClickStar) {
            this.props.onClickStar(1)
        }
    }
}
