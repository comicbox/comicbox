import autobind from 'autobind-decorator'
import Layout from 'js/views/layout'
import { Component, h } from 'preact'
import Button from 'preact-material-components/Button'

export default class Theme extends Component {

    public render() {
        const sections = [
            {
                name: 'Primary',
                colours: [
                    'primary',
                    'on-primary',
                ],
            },
            {
                name: 'Secondary',
                colours: [
                    'secondary',
                    'on-secondary',
                ],
            },
            {
                name: 'Background',
                colours: [
                    'background',
                    'text-primary-on-background',
                    'text-secondary-on-background',
                ],
            },
            {
                name: 'Surface',
                colours: [
                    'surface',
                    'on-surface',
                ],
            },
        ]
        return <Layout backLink='/'>
            <h1>Theme</h1>
            {sections.map(sec => <div key={sec.name}>
                {sec.name}: {sec.colours.map(c => this.input(c))}
            </div>)}
            <div>
                <Button onClick={this.btnRest}>Rest</Button>
            </div>
        </Layout >
    }

    private input(name: string) {
        return <input type='color' value={getVar(name).trim()} onChange={this.change(name)} />
    }

    @autobind
    private change(name: string) {
        return (e: Event) => {
            if (e.target instanceof HTMLInputElement) {
                setVar(name, e.target.value)
            }
        }
    }

    @autobind
    private btnRest() {
        localStorage.setItem('theme', JSON.stringify({}))
        document.body.removeAttribute('style')
    }

}

export function loadTheme() {
    const theme: Dictionary<string> = JSON.parse(localStorage.getItem('theme'))
    for (const name in theme) {
        if (theme.hasOwnProperty(name)) {
            const colour = theme[name]

            setVar(name, colour)
        }
    }
}

function getVar(name: string): string {
    const style = getComputedStyle(document.body)
    return style.getPropertyValue(`--mdc-theme-${name}`)
}
function setVar(name: string, colour: string): void {
    document.body.style.setProperty(`--mdc-theme-${name}`, colour)
    const theme: Dictionary<string> = JSON.parse(localStorage.getItem('theme')) || {}
    theme[name] = colour
    localStorage.setItem('theme', JSON.stringify(theme))
}
