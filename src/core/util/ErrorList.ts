class ErrorList {
    private errorList: ErrorItem[] = [];

    setError(message: string, field: string, context: string|null = null, id: string|null = null) {
        let found = false;

        this.errorList = this.errorList.map((errorItem: ErrorItem) => {
            if (errorItem.field === field && errorItem.context === context && errorItem.id === id) {
                found = true;

                return new ErrorItem(message, field, context, id);
            } else {
                return errorItem;
            }
        });

        if (!found) {
            this.errorList.push(new ErrorItem(message, field, context, id));
        }
    }

    removeError(field: string, context: string|null = null, id: string|null = null) {
        this.errorList = this.errorList.filter((errorItem: ErrorItem) => {
            return !(errorItem.field === field && errorItem.context === context && errorItem.id === id);
        });
    }

    removeAll() {
        this.errorList = [];
    }

    getState() {
        return this.errorList;
    }

    get(field: string, context: string|null = null, id: string|null = null) {
        let found = this.errorList.find((errorItem: ErrorItem) => {
            return errorItem.field === field && errorItem.context === context && errorItem.id === id;
        });

        return found ? found : null;
    }
}

class ErrorItem {
    field: string;
    id: string|null = null;
    context: string|null = null;
    message: string|null;

    constructor(message: string|null, field: string, context: string|null = null, id: string|null = null) {
        this.message = message;
        this.field = field;
        this.id = id;
        this.context = context;
    }
}

export {
    ErrorList,
}
