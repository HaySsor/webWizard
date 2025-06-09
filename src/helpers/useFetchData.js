import {ref} from "vue";

export function useFetchData(url) {
    const data    = ref(null)
    const error   = ref(null)
    const loading = ref(false)

    async function fetchData() {
        loading.value = true
        try {
            const res     = await fetch(url)
            const payload = await res.json()
            if (!res.ok) {
                error.value = { status: res.status, message: payload.message || res.statusText }
            } else {
                data.value = payload
            }
        } catch (err) {
            error.value = { status: null, message: err.message }
        } finally {
            loading.value = false
        }
    }

    return { data, error, loading, fetchData }
}