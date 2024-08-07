import { Hono } from 'hono'

const appConfig = JSON.parse(await Deno.readTextFile("./config/app.json"))

const app = new Hono()


app.get('/app_config', (c) => {
    return c.json(appConfig)
})

app.all('/', (c) => {
    return c.text('一切安好~')
})

Deno.serve(app.fetch)
