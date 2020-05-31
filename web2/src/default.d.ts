declare module "*.module.scss" {
    const styles: { [className: string]: string }
    export default styles;
}

type KeyOfType<T, F> = {
    [K in keyof T]: T[K] extends F ? K : never
}[keyof T]