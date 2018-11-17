import { Component, h } from 'preact'

interface State {
    src: string
}
// from https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/
const lazyImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target instanceof HTMLImageElement) {
                const lazyImage = entry.target
                lazyImage.src = lazyImage.dataset.src
                // lazyImage.srcset = lazyImage.dataset.srcset

                lazyImageObserver.unobserve(lazyImage)
            }
        }
    })
})

export default class LazyImg extends Component<JSX.HTMLAttributes, State> {
    private img: HTMLImageElement

    public componentDidMount() {
        this.img.dataset.src = this.props.src
        lazyImageObserver.observe(this.img)
    }

    public componentDidUnmount() {
        lazyImageObserver.unobserve(this.img)
    }

    public render() {
        const notSrcProps = { ...this.props }
        delete notSrcProps.src
        delete notSrcProps.srcset

        return <img
            {...notSrcProps as any}
            ref={e => this.img = e}
        />
    }

}
