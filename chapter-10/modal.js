// Modal factory gives you a Modal dialog. Bootstrap required!
blog.factory('Modal', function ($q, $templateCache, $http, $compile) {
// sets some properties and initializes a deferred to play with.
    // scope: Scope object to apply to template
    // template_id: ID or path of AngularJS template or partial
    // options: object full of options to give to Bootstrap's modal() upon open
    var Modal = function (scope, template_id, options) {
        options = options || {};
        this.scope = scope;
        this.template_id = template_id;
        this.options = {};
        angular.extend(this.options, {show: false}, options);
        this.dfrd = $q.defer();
    };
// shows a modal dialog; returns a promise to be resolved
    // when the dialog is opened.
    // does not check if one is already opened.
    Modal.prototype.open = function () {
        var template, that = this;
        if (this.modal) {
            this.dfrd.reset();
            this.modal.modal('show');
            this.dfrd.resolve();
            return this.dfrd.promise;
        }
        template = $templateCache.get(this.template_id);
        // cache miss
        if (angular.isUndefined(template)) {
            $http.get(this.template_id).success(function (data) {
                template = data;
                that.modal = $compile(template)(that.scope).modal(that.options);
                that.modal.modal('show');
                that.dfrd.resolve();
            }).error(function () {
                    throw new Error('unable to find template "' + that.template_id + '" anywhere. maybe template gnomes stole it?');
                });
        } else {
            this.modal = $compile(template)(this.scope).modal(this.options);
            this.modal.modal('show');
            this.dfrd.resolve();
        }
        return that.dfrd.promise;
    };
// closes a modal dialog. if no dialog exists, tosses an exception.
    // does not check to see if the modal is currently open.
    Modal.prototype.close = function () {
        if (!this.modal) {
            throw new Error('unable to close an unopened modal');
        }
        this.modal.modal('hide');
    };
    return Modal;
});