import { Hono } from 'hono'

const app = new Hono()


app.all('/', async (ctx) => {
    ctx.text('一切正常~')
})


export default app
