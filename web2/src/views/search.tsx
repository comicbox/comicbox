
import { useState, useEffect } from "preact/hooks";
import { bindValue } from '@zwzn/spicy'
import { db, Series } from "db";
import { SeriesList } from "components/series";
import { FunctionalComponent, h } from "preact";
import { Layout } from "components/layout";
import styles from "./search.module.scss";

export const SearchIndex: FunctionalComponent = props => {
    const url = new URL(location.href)
    const [search, setSearch] = useState(url.searchParams.get('q') ?? '')
    const [results, setResults] = useState<Series[]>([])
    useEffect(() => {
        if (search === '') {
            url.searchParams.delete('q')
        } else {
            url.searchParams.set('q', search)
        }
        history.replaceState(null, 'search', url.toString())
        const terms = search.split(' ').filter(term => term !== '')
        db.series
            .where('search').startsWithAnyOfIgnoreCase(terms)
            .limit(10)
            .distinct()
            .toArray()
            .then(series => setResults(series))
    }, [search])

    return <Layout>
        <h1>Search</h1>
        <input class={styles.search} placeholder='Search' value={search} onInput={bindValue(setSearch)} />
        {results.length === 0 && <div class={styles.noResults}>No Results</div>}
        <SeriesList series={results} />
    </Layout>
}