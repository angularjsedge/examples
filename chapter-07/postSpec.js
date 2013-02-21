describe('Blog Factories', function () {
    var Post;
    beforeEach(inject(function ($injector) {
        Post = $injector.get('Post');
    }));
    describe('Post', function () {
// covers all of the constructor's behavior, which is very little.
        describe('the constructor', function () {
            it('should store information temporarily when autosave flag is not truthy', function () {
                var post = new Post('cashews', 'peanuts', new Date(), 'Mr. Almond');
                expect(post.temp.title).toBe('cashews');
                expect(post.temp.body).toBe('peanuts');
                expect(post.title).toBeUndefined();
                expect(post.body).toBeUndefined();
                expect(post.date).not.toBeUndefined();
                expect(post.author).toBe('Mr. Almond');
            });
            it('should not store information temporarily when autosave flag is truthy', function () {
                var post = new Post('cashews', 'peanuts', new Date(), 'Mr. Almond', true);
                expect(post.title).toBe('cashews');
                expect(post.body).toBe('peanuts');
                expect(post.temp.title).toBeUndefined();
                expect(post.temp.body).toBeUndefined();
                expect(post.date).not.toBeUndefined();
                expect(post.author).toBe('Mr. Almond');
            });
        });
        describe('the updateDate method', function () {
            it('should reset the date', function () {
                var old_date, post = new Post();
                old_date = post.toString();
                post.updateDate();
// it would be kind of weird/difficult to try to assert it updates the date object
// to NOW; so just assert it changed.
                expect(old_date).not.toBe(post.date.toString());
            });
        });
        describe('the save method', function () {
            it('should copy information from temp object', function () {
                var post = new Post('foo', 'bar');
                post.save();
                expect(post.title).toBe('foo');
                expect(post.body).toBe('bar');
            });
            it('should call updateDate method', function () {
                var post = new Post();
// we just need to assert that save() happens to call the updateDate() method
                spyOn(post, 'updateDate');
                post.save();
                expect(post.updateDate).toHaveBeenCalled();
            });
            it('should call the stopEditing method', function () {
                var post = new Post();
                spyOn(post, 'stopEditing');
                post.save();
                expect(post.stopEditing).toHaveBeenCalled();
            });
        });
        describe('the beginEditing method', function () {
            it('should rearrange some data in the post', function () {
                var post = new Post('foo', 'bar', new Date(), 'baz', true);
                post.beginEditing();
// we assert the state changes and the information has been copied out of temp
                expect(post.editing).toBeTruthy();
                expect(post.temp.title).toBe(post.title);
                expect(post.temp.body).toBe(post.body);
            });
        });
        describe('the stopEditing method', function () {
            it('should set editing flag to false and empty temp object', function () {
                var post = new Post('foo', 'bar', new Date(), 'baz', true);
                post.beginEditing();
                post.stopEditing();
                expect(post.editing).toBeFalsy();
// note that you cannot use "toBe" here, because {} !== {}
                expect(post.temp).toEqual({});
            });
        });
        describe('toString method', function () {
            it('should return a JSON string', function () {
                var post = new Post('foo', 'bar', new Date(), 'baz', true);
                expect(post.toString()).toBe(angular.toJson(post));
            });
        });
    });
});

