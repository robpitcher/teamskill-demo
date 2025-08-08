import axios from 'axios'

const api = axios.create({
  withCredentials: true
})

export async function apiGet(url: string): Promise<any> {
  const res = await api.get(url)
  return res.data
}

export async function apiPost(url: string, body: unknown): Promise<any> {
  const res = await api.post(url, body, {
    headers: { 'Content-Type': 'application/json' }
  })
  return res.data
}

export default api
