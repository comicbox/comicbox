import * as s from 'css/edit.scss'
import Modal, { OpenModal } from 'js/components/modal'
import { toast } from 'js/components/snack'
import { gql } from 'js/graphql'
import Book from 'js/model/book'
import { Model, ModelArray, prop, table } from 'js/model/model'
import map from 'lodash/map'
import { Component, h } from 'preact'
import Select from 'preact-material-components/Select'
import TextField from 'preact-material-components/TextField'
import { QueryBuilder } from './query-builder'

export type List = 'NONE' | 'PLANNING' | 'READING' | 'COMPLETED' | 'PAUSED' | 'DROPPED'
export const lists: Dictionary<List> = {
    None: 'NONE',
    Reading: 'READING',
    Completed: 'COMPLETED',
    Dropped: 'DROPPED',
    Paused: 'PAUSED',
    Planning: 'PLANNING',
}
@table('series', 'update_series', 'SeriesInput!', 'name', 'String!')
export default class Series extends Model {

    @prop('[Book]', { jsType: Book })
    public books: ModelArray<Book>

    @prop('List')
    public list: List

    @prop('[String]')
    public tags: string[]

    @prop('String')
    public name: string

    @prop('Int')
    public read: number

    @prop('Int')
    public total: number

    public get id() {
        return this.name
    }

    public get link() {
        return `/series/${encodeURIComponent(this.name)}`
    }

    public get sortIndex() {
        return `series-${this.name}`
    }

    public async updateAllBooks(book: Partial<Book>) {
        const newData = await gql(`update_series_books(name: $name, data: $book) {
            ${(new QueryBuilder(Series)).generateGQL(Series)}
        }`,
            {
                name: 'String!',
                book: 'BookInput!',
            },
            {
                name: this.name,
                book: book,
            }, true)

        this.data = { ...this.data, ...newData }
    }

    public async openEditModal() {

        const nameChange = (e: Event) => {
            if (e.target instanceof HTMLInputElement) {
                this.name = e.target.value as List
            }
        }
        const tagsChange = (e: Event) => {
            if (e.target instanceof HTMLInputElement) {
                if (e.target.value === '') {
                    this.tags = []
                } else {
                    this.tags = e.target.value.split(',').map(tag => tag.trim().replace(/ /g, '_'))
                }
            }
        }
        const listChange = (e: Event) => {
            if (e.target instanceof HTMLSelectElement) {
                this.list = e.target.value as List
            }
        }
        const formSubmit = async () => {
            await this.save()
            toast(`Updated ${this.name}`)
        }

        await OpenModal(<Modal.Surface formSubmit={formSubmit}>
            <Modal.Title>
                Edit {this.name}
            </Modal.Title>
            <Modal.Body>
                <div class={s.form}>
                    <TextField
                        class={s.element}
                        label='Name'
                        value={this.name}
                        onChange={nameChange}
                    />
                    <TextField
                        class={s.element}
                        label='Tags'
                        value={(this.tags || []).join(', ')}
                        onChange={tagsChange}
                    />
                    <Select
                        hintText='Select a list'
                        class={s.element}
                        onChange={listChange}
                    >
                        {map(lists, (list, name) => <Select.Item selected={list === this.list} value={list}>
                            {name}
                        </Select.Item>)}
                    </Select>
                </div>
            </Modal.Body>
            <Modal.Actions>
                <Modal.Button action='close'>Close</Modal.Button>
                <Modal.Button action='accept' submit>Save</Modal.Button>
            </Modal.Actions>
        </Modal.Surface>)

    }

}
