const request = require('supertest')
const app = require('./index')

import { describe, it, expect } from 'vitest'

describe('GET /', () => {
  it('should give Hello, World!', async () => {
    const response = await request(app).get('/')
    console.log(response, 'Response')
    expect(response.body).toBe('Hello World!')
  })
})
