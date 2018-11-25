import * as s from 'css/layout.scss'
import ModelList from 'js/components/model-list'
import Book from 'js/model/book'
import Series from 'js/model/series'
import Layout from 'js/views/layout'
import { Component, h } from 'preact'
import { debug } from 'util';
import { ModelArray } from 'js/model/model';

interface Props {
    matches?: { [id: string]: string }
}

interface State {
    pages: Array<string>
    current: number
    width: number
    height: number
}

export default class Read extends Component<Props, State> {
    private img: HTMLImageElement
    private map: HTMLMapElement

    constructor() {
        super()
        this.state = {
            pages: [],
            current: 0,
            width: 0,
            height: 0,
        }
    }

    public async componentWillMount() {
        const id = this.props.matches.id
        const pageMatch = this.props.matches.page
        var pageNum = 0
        if (pageMatch != "") {
            pageNum = Number(pageMatch)
        }
        const bookQuery = Book
            .select('pages')
            .where('id', '=', id)
            .get()
        
        const book = await bookQuery
        const pages = book[0].pages.map(page => page.url)

        this.setState((state: State, props: Props) => {
            return {
                pages: pages,
                current: pageNum,
                width: 0,
                height: 0,
            }
        })
    }

    handleImageLoaded() {
        const width = this.img.width
        const height = this.img.height
 
        this.setState((state: State, props: Props) => {
            return {
                pages: state.pages,
                current: state.current,
                width: width,
                height: height,
            }
        })
    }


    public render() {
        this.state.pages
        const page = this.state.pages[this.state.current]
        const change = (step: number) => {
            return () => this.setState((state: State, props: Props) => {
                const dst = state.current+step
                if (dst < state.pages.length && dst > -1) {
                    //TODO update progress to dst
                    return {
                        pages: state.pages,
                        current: dst,
                        width: 0,
                        height: 0,
                    }
                }
                return state
            })  
        }
        const left = change(-1)
        const right = change(1)

        const width = this.state.width
        const height = this.state.height

        const leftBox = "0,0,"+Math.floor(width/3)+","+height
        const rightBox = 2*Math.floor(width/3)+",0,"+width+","+height
        const centerBox = Math.floor(width/3)+",0,"+2*Math.floor(width/3)+","+height

        return <Layout backLink='/'>
            <h1>Read</h1>
            <img src={page} className="img-responsive" useMap={`#image-map`} ref={e => this.img = e} onLoad={this.handleImageLoaded.bind(this)}/>
                <map name="image-map" ref={e => this.map = e}>
                
                <area target="" onClick={left.bind(this)} alt="left" title="left"  coords={leftBox} shape="rect" />
                <area target="" onClick={() => console.log("center")} alt="center"  title="center" coords={centerBox}  shape="rect" />
                <area target="" onClick={right.bind(this)} alt="right" title="right" coords={rightBox}  shape="rect" />
            </map>
        </Layout >
    }

}