import { FunctionalComponent, h } from "preact"
import { NextInSeriesList, SeriesList } from "../components/series"
import { useQuery, db } from "db"
import { BookList } from "components/book"
import { Layout } from "components/layout"

export const SeriesIndex: FunctionalComponent = () => {
    const series = useQuery(
        () => db.series.orderBy('name').toArray(),
        []
    )

    return <Layout>
        <h1>Series</h1>
        <SeriesList series={series.result} />
    </Layout>
}