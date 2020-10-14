import { Client, WebSocket } from 'cors-bypass'

const client = new Client()

await client.openServerInNewTab({
serverUrl: 'http://random-domain.com/server.html',
adapterUrl: 'https://your-site.com/adapter.html'
})

const ws = new WebSocket('ws://echo.websocket.org')
ws.onopen = () => ws.send('hello')
ws.onmessage = ({ data }) => console.log('received', data)