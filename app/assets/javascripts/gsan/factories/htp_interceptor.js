var app = angular.module("gsan");

app.factory('httpInterceptor', function ($q, $rootScope, $log, Flash) {
    var numLoadings = 0;
    var submittingRequests = 0;

    var isSubmitRequest = function(method) {
      return ["PUT", "POST", "PATCH", "DELETE"].indexOf(method) >= 0
    }

    return {
        request: function (config) {
            numLoadings++;
            $rootScope.$broadcast("loader_show");

            if (isSubmitRequest(config.method)) {
                submittingRequests++;
                $rootScope.$broadcast("submitting_loader_show");
            }

            return config || $q.when(config)
        },
        response: function (response) {
            if ((--numLoadings) === 0) {
                $rootScope.$broadcast("loader_hide");
            }

            if (isSubmitRequest(response.config.method)) {
                if ((--submittingRequests) === 0) {
                    $rootScope.$broadcast("submitting_loader_hide");
                }
            }

            return response || $q.when(response);
        },
        responseError: function (response) {
            if ((--numLoadings) === 0) {
                $rootScope.$broadcast("loader_hide");
            }

            if (isSubmitRequest(response.config.method)) {
                if ((--submittingRequests) === 0) {
                    $rootScope.$broadcast("submitting_loader_hide");
                }
            }

            if (response.status === 500) {
                Flash.setMessage("danger", "Um erro inexperado aconteceu...");
                $("body").animate({ scrollTop: 0 }, "slow");
            }

            return $q.reject(response);
        }
    };
})
.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
});
