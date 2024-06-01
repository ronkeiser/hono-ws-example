import { Hono } from 'hono'
import { upgradeWebSocket } from 'hono/cloudflare-workers'

const app = new Hono()

app.get(
	'/ws',
	upgradeWebSocket((c) => {
		return {
			onMessage(event, ws) {
				console.log(`Message from client: ${event.data}`)
				ws.send('Hello from server!')
			},
			onClose: () => {
				console.log('Connection closed')
			},
		}
	}),
)

export default app
