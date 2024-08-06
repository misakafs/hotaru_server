import { Hono } from 'hono'

const app = new Hono()

app.all('/', (c) => {
    return c.text('一切安好~')
})

Deno.serve(app.fetch)
