import * as s from 'css/read.scss'
import autobind from 'autobind-decorator'
import Book from 'js/model/book'

import { Component, h } from 'preact'


interface Props {
    matches?: { [id: string]: string }
}

interface State {
    pages: string[]
    current: number
    width: number
    height: number
}

export default class Read extends Component<Props, State> {
    private img: HTMLImageElement

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

    componentDidMount() {
        window.addEventListener("resize", this.debounce(this.resize, 250));
        this.resize();
    }
    

    public render() {
        const page = this.state.pages[this.state.current]

        const width = this.state.width
        const height = this.state.height

        const leftBox = "0,0,"+Math.floor(width/3)+","+height
        const rightBox = 2*Math.floor(width/3)+",0,"+width+","+height
        const centerBox = Math.floor(width/3)+",0,"+2*Math.floor(width/3)+","+height

        return <div className={s.reader}>
            <img src={page} className={s.imgResponsive} useMap={`#image-map`} ref={e => this.img = e} onLoad={this.handleImageLoaded}/>
                <map name="image-map">
                
                <area target="" onClick={this.stepPage(-1)} alt="left" title="left"  coords={leftBox} shape="rect" />
                <area target="" onClick={this.displayNav} alt="center"  title="center" coords={centerBox}  shape="rect" />
                <area target="" onClick={this.stepPage(1)} alt="right" title="right" coords={rightBox}  shape="rect" />
            </map>
        </div >
    }

    debounce(fn: any, delay: number) {
        var timer: any = null;
        return function () {
          var context = this, args = arguments;
          clearTimeout(timer);
          timer = setTimeout(function () {
            fn.apply(context, args);
          }, delay);
        };
      }

    @autobind
    resize() {
        this.handleImageLoaded()
    }

    @autobind
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

    @autobind
    changePage(dst: number) {
        this.setState((state: State, props: Props) => {
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

    @autobind
    stepPage(step: number): () => void  {
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

    @autobind
    displayNav() {
        console.log("center")
    }
}