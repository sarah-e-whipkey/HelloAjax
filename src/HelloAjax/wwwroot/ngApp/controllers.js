var HelloAjax;
(function (HelloAjax) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController($http) {
                var _this = this;
                this.$http = $http;
                this.message = 'Hello from the home page!';
                $http.get('/api/movies')
                    .then(function (response) {
                    _this.movies = response.data;
                })
                    .catch(function (response) {
                    console.error('Could not retrieve movies');
                });
            }
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
        var GenreController = (function () {
            function GenreController($http, $uibModal) {
                var _this = this;
                this.$http = $http;
                this.$uibModal = $uibModal;
                $http.get('/api/genres')
                    .then(function (response) {
                    _this.genres = response.data;
                });
            }
            GenreController.prototype.getMovies = function () {
                var _this = this;
                this.$uibModal.open({
                    templateUrl: 'movieListModal.html',
                    controller: ModalController,
                    controllerAs: 'modalController',
                    resolve: {
                        genreId: function () {
                            return _this.selectedGenre.id;
                        }
                    }
                });
            };
            return GenreController;
        }());
        Controllers.GenreController = GenreController;
        var ModalController = (function () {
            function ModalController(genreId, $http) {
                var _this = this;
                this.genreId = genreId;
                this.$http = $http;
                this.$http.get("/api/genres/" + genreId)
                    .then(function (response) {
                    _this.movies = response.data.movies;
                });
            }
            return ModalController;
        }());
        var AboutController = (function () {
            function AboutController() {
                this.message = 'Hello from the about page!';
            }
            return AboutController;
        }());
        Controllers.AboutController = AboutController;
    })(Controllers = HelloAjax.Controllers || (HelloAjax.Controllers = {}));
})(HelloAjax || (HelloAjax = {}));
//# sourceMappingURL=controllers.js.map