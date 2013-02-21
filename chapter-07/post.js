// returns a class Post which represents a blog post
blog.factory('Post', function () {
    // set date, author, and temporary title and body
    // date can be a Date object or a JS timestamp or anything else Date objects accept
    var Post = function (title, body, date, author, autosave) {
        this.date = new Date(date);
        this.author = author;
        if (autosave) {
            this.title = title;
            this.body = body;
            this.temp = {};
        } else {
            this.temp = {title: title, body: body};
        }
    };
    // update the date to NOW
    Post.prototype.updateDate = function () {
        this.date = new Date(); // js Date object
    };
    // save the temp info to the real info, then update the date to now.
    Post.prototype.save = function () {
        this.title = this.temp.title;
        this.body = this.temp.body;
        this.updateDate();
        this.stopEditing();
    };
    // prepares this post for editing
    Post.prototype.beginEditing = function () {
        this.editing = true;
        this.temp.title = this.title;
        this.temp.body = this.body;
    };
    // takes the post out of 'editing' mode
    Post.prototype.stopEditing = function () {
        this.editing = false;
        this.temp = {};
    };
    // handiness to convert this Post to a string, for debugging purposes
    Post.prototype.toString = function () {
        return angular.toJson(this);
    };
    return Post;
});

