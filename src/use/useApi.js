import axios from "axios";

export const useApi = () => {
    const baseApi = import.meta.env.VITE_API_URL

    const API = {
        url: baseApi,
        get() {
            return new Promise((resolve, reject) => {
                axios.get(this.url)
                    .then((res) => {
                        resolve({
                            data: res.data
                        })
                    }).catch((e) => {
                    reject(e)
                }).finally(() => {
                    this.url = baseApi
                })
            })
        },
        post(data) {
            return new Promise((resolve, reject) => {
                axios.post(this.url, data)
                    .then((res) => {
                        resolve(res)
                    }).catch((err) => {
                        reject(err)
                }).finally(() => {
                    this.url = baseApi
                })
            })
        },
        put(data) {
            return new Promise((resolve, reject) => {
                axios.put(this.url, data)
                    .then((res) => {
                        resolve(res)
                    }).catch((err) => {
                        reject(err)
                }).finally(() => {
                    this.url = baseApi
                })
            })
        },
        delete() {
            return new Promise((resolve, reject) => {
                axios.delete(this.url)
                    .then((res) => {
                        resolve(res)
                    }).catch((err) => {
                        reject(err)
                }).finally(() => {
                    this.url = baseApi
                })
            })
        },
        path(path) {
            this.url += path
            return this
        }
    }

    return {
        API
    }
}
