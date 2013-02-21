// $resource returns a Resource object. The second parameter describes the parameters to the resource call.
// Here, specify a :id in the URL and tell AngularJS to insert the value of the 'donutId' string in the
// URL when making a request. This assumes that the server will return a collection of donuts at the "/donut/" URL,
// and if an ID is specified ("/donut/foo") then it will only return that particular donut.
var Donut = $resource('/donut/:id', {id: '@donutId'});
// use this object to query. Note that powdered_donut is immediately undefined after this line executes, because
// "get" is an asynchronous operation. Some magic happens, however, and when the item is retrieved from the server,
// the value of powdered_donut is populated.
// Functions named Donut.foo() are "class" functions, and the returned value of these functions
// is considered an instance of Donut. Donut.save() and donut.$save() do basically the same thing; the former requires
// more parameters.
// this is an HTTP GET.
var powdered_donut = Donut.get({donutId: 'powdered'}, function (donut) {
    // optional success callback; do stuff with donut. Will have the same value as powdered_donut when this resolves.
    // this
    powdered_donut.sold_out = true;
    powdered_donut.$save(); // HTTP POST
    // or you could just HTTP DELETE the donut
    // powdered_donut.$delete();
}, function (error) {
    // optional failure callback
});

// this is an HTTP DELETE to /donut/glazed.
// if we had retrieved the glazed donut using get(), then we could delete it using the $delete() function. Same thing.
Donut.delete({donutId: 'glazed'}, function (donut) {
    // optional callback if we successfully deleted
}, function (error) {
    // optional failure callback
});
// get all donuts. HTTP GET
var all_donuts = Donut.query(function (donuts) {
    // optional success callback
}, function (error) {
    // optional failure callback
});

// HTTP POST. can use $save on actual
Donut.save({donutId: 'pepto'}, {id: 'pepto', cost: '1.23'}, function (donut) {
    // successful save
}, function (error) {
    // unsuccessful save
});
