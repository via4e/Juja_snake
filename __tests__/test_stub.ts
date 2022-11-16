const matcher = (str1:string, str2:string) => str1.toLowerCase() === str2.toLowerCase() ? true : false

describe('Stub test cases', () => {
    it('compare strings', () => {
        expect(matcher('aHYsxevw', 'aHYsxevw')).toBe(true)
        expect(matcher('aHYsxe234vw', 'aHYsxevw')).toBe(false)
    })
})