const request = require('supertest')
const app = require('./index')

import { describe, it, expect } from 'vitest'

describe('GET /', () => {
  it('should give Hello World!', async () => {
    const response = await request(app).get('/')
    expect(response.body.data).toBe('Hello World!')
  })
})
