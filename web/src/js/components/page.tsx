import isEqual from 'lodash/isEqual'
import { Component } from 'preact'

export interface PageProps {
    matches?: { [id: string]: string }
}

export default abstract class Page<P = {}, S = {}> extends Component<P & PageProps, S> {

    constructor(props: P) {
        super(props as P & PageProps)
    }

    public componentDidMount() {
        this.pageLoad()
    }

    public componentDidUpdate(prevProps: P & PageProps) {        
        if (!isEqual(this.props.matches, prevProps.matches)) {
            this.pageUnload()
            this.pageLoad()
        }
    }

    public componentWillUnmount() {
        this.pageUnload()
    }

    public pageLoad() {
        // empty block
    }

    public pageUnload() {
        // empty block
    }
}
