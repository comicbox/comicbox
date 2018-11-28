import * as s from 'css/edit.scss'
import Modal, { OpenModal } from 'js/components/modal'
import Book from 'js/model/book'
import { Model, ModelArray, prop, table } from 'js/model/model'
import { Component, h } from 'preact'
import Select from 'preact-material-components/Select'
import TextField from 'preact-material-components/TextField'
import { toast } from 'js/components/snack';

export type List = 'PLANNING' | 'READING' | 'COMPLETED' | 'PAUSED' | 'DROPPED'

@table('series', 'series', 'SeriesInput!', 'name', 'String!')
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
        return `/series/${this.name}`
    }

    public get sortIndex() {
        return `series-${this.name}`
    }

    public async openEditModal() {
        const lists = ['READING', 'COMPLETED', 'DROPPED', 'PAUSED', 'PLANNING']

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
                    selectedIndex={lists.indexOf(this.list) + 1}
                    onChange={listChange}
                >
                    <Select.Item value='READING'>Reading</Select.Item>
                    <Select.Item value='COMPLETED'>Completed</Select.Item>
                    <Select.Item value='DROPPED'>Dropped</Select.Item>
                    <Select.Item value='PAUSED'>Paused</Select.Item>
                    <Select.Item value='PLANNING'>Planning</Select.Item>
                </Select>
            </Modal.Body>
            <Modal.Actions>
                <Modal.Button action='close'>Close</Modal.Button>
                <Modal.Button action='accept' submit>Save</Modal.Button>
            </Modal.Actions>
        </Modal.Surface>)

    }

}
