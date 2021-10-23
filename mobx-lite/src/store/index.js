import {makeAutoObservable} from "mobx";
import axios from "axios";

class Counter {
    count = 0;
    api = null;

    constructor() {
        makeAutoObservable(this)
    }

    increment() {
        this.count = this.count + 1
    }

    decrement() {
        this.count = this.count - 1
    }

    getApi(url = 'https://jsonplaceholder.typicode.com/todos/1') {
        axios.get(url).then((json) => {
            this.api = json.data
        })
    }


}

export default new Counter()