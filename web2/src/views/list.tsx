import { FunctionalComponent, h } from "preact"
import { SeriesList } from "../components/series"
import { useQuery, db, Series } from "db"
import { BookList } from "components/book"
import { Layout } from "components/layout"

export const ListIndex: FunctionalComponent = () => {
    const reading = useList('READING')
    const paused = useList('PAUSED')
    const dropped = useList('DROPPED')
    const planning = useList('PLANNING')
    const completed = useList('COMPLETED')

    return <Layout>
        <h1>Reading</h1>
        <SeriesList series={reading.result} />
        <h1>Paused</h1>
        <SeriesList series={paused.result} />
        <h1>Dropped</h1>
        <SeriesList series={dropped.result} />
        <h1>Planning</h1>
        <SeriesList series={planning.result} />
        <h1>Completed</h1>
        <SeriesList series={completed.result} />
    </Layout>
}

function useList(list: Series['list']) {
    return useQuery(() => db.series.where('list').equals(list).toArray(), [])
}
