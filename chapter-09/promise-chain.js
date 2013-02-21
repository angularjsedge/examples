$http.get('foo.url')
    .then(function (res) {
        // do stuff with res
        if (something) {
            return $q.reject(first_sad_obj);
        }
        return first_happy_obj;
    }, function (res) {
        // do other stuff with res
        return first_sad_obj;
    })
    .then(function (first_happy_obj) {
        // do stuff
        if (something_else) {
            return $q.reject(second_sad_obj);
        }
        return second_happy_obj;
    }, function (first_sad_obj) {
        // more stuff to do
        return second_sad_obj;
    })
    .then(function (second_happy_obj) {
        // success
    }, function (second_sad_obj) {
        // failure. etc.
    });
