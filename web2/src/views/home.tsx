import { FunctionalComponent, h } from "preact"
import { SeriesList } from "../components/series"

export const Home: FunctionalComponent = () => {
    return <div>
        <h1>Home</h1>
        <SeriesList />
    </div>
}