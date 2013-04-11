describe('Blog Filters', function () {
    var filter;
    beforeEach(inject(function ($filter) {
        filter = $filter;
    }));
    describe('the capitalize filter', function () {
        it('should capitalize a string, naturally', function () {
            var capitalize = filter('capitalize');
            expect(capitalize('foo')).toBe('Foo');
        });
    });
});
