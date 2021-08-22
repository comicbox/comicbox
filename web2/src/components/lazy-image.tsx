import { FunctionalComponent, h } from 'preact'
import { Ref, useEffect, useRef, useState } from 'preact/hooks'

export const LazyImage: FunctionalComponent<
    h.JSX.HTMLAttributes<HTMLImageElement>
> = props => {
    const [src, setSrc] = useState<string | undefined>(undefined)
    const imgRef = useRef<HTMLImageElement>(null)
    const onScreen = useOnScreen(imgRef, '200px')

    useEffect(() => {
        if (onScreen) {
            setSrc(props.src)
        } else {
            if (!imgRef.current?.complete) {
                setSrc(undefined)
            }
        }
    }, [onScreen, props.src])

    return <img ref={imgRef} {...props} src={src} />
}

function useOnScreen(ref: Ref<Element | null>, rootMargin: string = '0px') {
    // State and setter for storing whether element is visible
    const [isIntersecting, setIntersecting] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Update our state when observer callback fires
                setIntersecting(entry.isIntersecting)
            },
            {
                rootMargin,
            },
        )
        if (ref.current) {
            observer.observe(ref.current)
        }
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current)
            }
        }
    }, []) // Empty array ensures that effect is only run on mount and unmount

    return isIntersecting
}

// function useOnScreenEffect(ref: PropRef<Element>, cb: (abortController: AbortController) => void, rootMargin: string = '0px') {
//     // State and setter for storing whether element is visible
//     const abortRef = useRef<AbortController>()

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             ([entry]) => {
//                 if (entry.isIntersecting) {
//                     if (abortRef.current === undefined) {
//                         abortRef.current = new AbortController()
//                     }
//                     cb(abortRef.current)
//                 } else {
//                     if (abortRef.current !== undefined) {
//                         abortRef.current.abort()
//                     }
//                 }
//             },
//             {
//                 rootMargin
//             }
//         );
//         if (ref.current) {
//             observer.observe(ref.current);
//         }
//         return () => {
//             if (ref.current) {
//                 observer.unobserve(ref.current);
//             }
//         };
//     }, []); // Empty array ensures that effect is only run on mount and unmount
// }
