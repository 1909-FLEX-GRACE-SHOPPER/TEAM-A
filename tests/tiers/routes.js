const { expect } = require('chai')
const app = require('../..//server')

describe('testing', () => {
    const test = 'test'
    it('does not change', () => {
        expect(test).to.equal('test')
    })
})