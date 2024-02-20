export class UpdateTodoDto {
    private constructor(
        public readonly id: Number,
        public readonly text?: string,
        public readonly completedAt?: string
    ) {

    }
    get values() {
        const returnObject: { [key: string]: any } = {}
        if (this.text) returnObject.text = this.text;
        if (this.completedAt) returnObject.completedAt = this.completedAt;
        return returnObject
    }
    static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
        const { id, text, completedAt } = props;
        if (!id || isNaN(Number(id))) {
            return ['id is not a valid number']
        }
        let newCompleteAt = completedAt;
        if (completedAt) {
            newCompleteAt = new Date(completedAt)
            if (newCompleteAt.toString() === 'Invalid Date') {
                return ['CompleteAt must be a valid date']
            }
        }
        if (!text) return ['Text property is required', undefined]

        return [undefined, new UpdateTodoDto(id,text, newCompleteAt)]
    }
}