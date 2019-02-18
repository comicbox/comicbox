import autobind from 'autobind-decorator'
import { Model } from 'js/model/model'

class ModelStore {
    private models: Map<string, Model[]> = new Map()

    public watch(model: Model) {
        const models = this.models.get(model.id) || []
        this.models.set(model.id, models.concat(model))

        model.addEventListener('change', this.modelChange)
    }

    public unwatch(model: Model) {
        const models = this.models.get(model.id)
        if (!models) {
            return
        }
        const index = models.indexOf(model)
        if (index > -1) {
            models.splice(index, 1)
        }
        model.removeEventListener('change', this.modelChange)
        if (models.length === 0) {
            this.models.delete(model.id)
        }
    }

    @autobind
    private modelChange(e: Event) {
        const models = this.models.get((e.target as Model).id)
        if (!models) {
            return
        }
        for (const model of models) {
            model.update(e.target as Model)
        }
    }
}

const store = new ModelStore()

export default store
