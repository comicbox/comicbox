import autobind from 'autobind-decorator'
import { Component, h, VNode } from 'preact'
import TabBar from 'preact-material-components/TabBar'

interface Props {
    children: Array<VNode<{ title: string }>>
}

interface State {
    active: number
}

// tslint:disable-next-line:max-classes-per-file
export default class TabContainer extends Component<Props, State> {
    private img: HTMLImageElement

    constructor(props: Props) {
        super(props)
        this.state = {
            active: 0,
        }
    }

    public render() {

        return <div>
            <TabBar>
                {this.props.children.map((child, i) =>
                    <TabBar.Tab
                        key={child.attributes.title}
                        active={i === this.state.active}
                        onClick={this.clickTab(i)}
                        type='button'
                    >
                        <TabBar.TabLabel>{child.attributes.title}</TabBar.TabLabel>
                    </TabBar.Tab>,
                )}
            </TabBar>
            {this.props.children[this.state.active]}
        </div>
    }

    @autobind
    private clickTab(index: number): (e: MouseEvent) => void {
        return (e: MouseEvent) => {
            this.setState({ active: index })
        }
    }
}
