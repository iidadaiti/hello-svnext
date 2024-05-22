import type { PageLoad } from './$types'

export const ssr = false

export const load: PageLoad = async ({ fetch }) => {
    try {
        const res = await fetch('http://localhost:3000')
        const text = await res.text()

        return { text }
    } catch (error) {
        console.error(error);

        if (error instanceof Error) {
            return { text: error.message }
        }

        return { text: 'failed to fetch' }
    }
}
