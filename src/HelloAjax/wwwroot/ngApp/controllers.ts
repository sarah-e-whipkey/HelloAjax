namespace HelloAjax.Controllers {

    export class HomeController {
        public message = 'Hello from the home page!';
        public movies;


        constructor(private $http: ng.IHttpService) {
            $http.get('/api/movies')
                .then((response) => {
                    this.movies = response.data;

                })
                .catch((response) => {
                    console.error('Could not retrieve movies');

                });
        }
    }

    export class GenreController {
         selectedGenre;
         genres;
         movies;

         constructor(private $http: ng.IHttpService, private $uibModal: ng.ui.bootstrap.IModalService) {
            $http.get('/api/genres')
                .then((response) => {
                    this.genres = response.data;
                });
        }

         getMovies() {

             this.$uibModal.open({
                 templateUrl: 'movieListModal.html',
                 controller: ModalController,
                 controllerAs: 'modalController',
                 resolve: {
                     genreId: () => {
                         return this.selectedGenre.id;
                     }
                 }
             });

           

        }

    }

    class ModalController {

        movies;

        constructor(private genreId: number, private $http: ng.IHttpService) {

            this.$http.get<any>(`/api/genres/${genreId}`)
                .then((response) => {
                    this.movies = response.data.movies;
                });

        }

    }

    export class AboutController {
        public message = 'Hello from the about page!';
    }

}
