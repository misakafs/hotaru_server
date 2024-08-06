import { Hono } from 'hono'

const app = new Hono()

app.all('/',  (c) => {
    return c.text('一切正常~')
})

export default app
