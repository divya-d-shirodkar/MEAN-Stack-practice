angular.module('product' , []);

angular.module('product')
	.controller('productController', function($scope, $http) {
		console.log('inside controller');

		$scope.addProduct = function() {

			console.log('add product');
			var data = {};
			data.name = $scope.name;
			data.description = $scope.description;
			data.price = $scope.price;
			data.imageUrl = $scope.imageUrl;

			$http.post('/product' , data).then( function() {
				console.log('succerss');
				$scope.getProducts();
			},
			function() {
				console.log('error');
			});

		};

		$scope.getProducts = function() {

			console.log('get product');
			$http.get('/product').then( function(response) {
				var response1 = JSON.stringify(response);
				console.log(response1);
				$scope.productList = response.data;
			},
			function() {
				console.log("error");
			});

		};

		$scope.deleteProduct = function(id) {
			$http.delete('/product/'+id).then(function(success) {
				console.log("syccess");
				$scope.getProducts();
			},
			function(error) {
				console.log("error");
			}); 
		};

	});