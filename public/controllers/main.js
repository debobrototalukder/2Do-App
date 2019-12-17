angular.module('todoController', [])

	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;
		// Get function that gets all the todos, uses the service
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});
		
		// Ading a new task from the form, sends text to node
		$scope.createTodo = function() {

			// Form validation
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				Todos.create($scope.formData)

					// On success, gets the new list of tasks from the database
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {};
						$scope.todos = data;
					});
			}
		};

		// Deleting an existing task from the database by id
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data;
				});
		};
	}]);