angular.module('ChartJsProvider.rule', ['chart.js'])
.config(['ChartJsProvider', function(ChartJsProvider) {
	// Configure all charts
	ChartJsProvider.setOptions({
		chartColors: ['#5bc0de', '#ec971f', '#97BBCD', '#949FB1', '#DCDCDC', '#4D5360','#F7464A'],
		responsive: true,
		legend: { display: true}
	});
}]);
app.controller('PieCtrl', function($scope, $timeout) {
	$scope.labels = ['A', 'B', 'C', 'D'];
	$scope.data = [200, 300, 80, 160];
	$scope.width = "600px";
	$scope.options = {
		legend: {
			display: true,
			position: 'bottom'
		},
		title: {
			display: true,
			text: 'Pie'
		}
	};

	$scope.$on('chart-create', function(evt, data) {
		console.log("chart-create-------" + data)
	})
	$scope.$on('chart-update', function(evt, data) {
		console.log("chart-update-------" + data)
	})
	$scope.$on('chart-destroy', function(evt, data) {
		console.log("chart-destroy-------" + data)
	})
});

app.controller("LineCtrl", function($scope) {
	$scope.labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
	$scope.data = [
		[15, 8, 12, 6, 10, 3, 17],
		[6, 22, 6, 12, 18, 25, 10]
	];
	$scope.series = ['Series a', 'Series b']
	$scope.datasetOverride = [{
		label: 'Series a',
		yAxisID: 'y-axis-1',
		borderDash: [5, 5],
		fill: false
	}, {
		label: 'Series b',
		yAxisID: 'y-axis-2',
		lineTension: 0
	}];

	$scope.options = {
		legend: {
			display: true
		},
		scales: {
			yAxes: [{
				id: 'y-axis-1',
				type: 'linear',
				display: true,
				position: 'left',
				ticks: {
					max: 20,
					min: 0,
					stepSize: 5
				}
			}, {
				id: 'y-axis-2',
				type: 'linear',
				display: true,
				position: 'right',
				ticks: {
					max: 30,
					min: 0,
					stepSize: 5
				}
			}]
		}
	}
	$scope.$on('chart-create', function(evt, data) {
		console.log("chart-create-------" + data)
	})
});

app.controller('BarCtrl', function($scope) {
	$scope.labels = ['task1', 'task2', 'task3', 'task4', 'task5',
		'task6', 'task7'
	];
	$scope.series = ['series a', 'series b', 'series c'];
	$scope.data = [
		[6, 3, 6, 8, 4, 12, 6],
		[10, 10, 12, 8, 4, 15, 6],
		[5, 3, 10, 6, 2, 15, 12]
	];
	$scope.options = {
		legend: {
			display: true
		},
		scales: {
			yAxes: [{
				//stacked: true,
				ticks: {
					max: 20,
					min: 0,
					stepSize: 5
				}
			}],
			xAxes: [{
				//stacked: true
			}]
		}
	}
	$scope.datasetOverride = [{
		label: "blue",
		backgroundColor: "rgba(165,220,230,0.6)",
		borderColor: "rgba(165,220,230,1)"
	}, {
		label: "red",
		backgroundColor: "rgba(255,129,156,0.6)",
		borderColor: "rgba(255,129,156,1)"
	}, {
		label: "yellow",
		backgroundColor: "rgba(255, 206, 86, 0.6)",
		borderColor: "rgba(255, 206, 86, 1)"
	}];
});

app.controller('BaseCtrl', function($scope) {
	$scope.labels = ['S0', 'S1', 'S2',
		'S3', 'S4', 'S5', 'S6'
	];
	$scope.data = [300, 270, 180, 40, 160, 80, 230];
	$scope.type = 'polarArea';

	$scope.toggle = function() {
		$scope.type = $scope.type === 'polarArea' ? 'pie' : 'polarArea';
	};
});

app.controller('RadarCtrl', function($scope) {
	$scope.labels = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6'];
	$scope.series = ['Plan', 'Actual'];
	$scope.data = [
		[65, 59, 90, 81, 56, 55, 40],
		[28, 48, 40, 19, 96, 27, 100]
	];
	$scope.datasetOverride = [{
		backgroundColor: "rgba(165,220,230,0.2)",
		borderColor: "rgba(165,220,230,1)"
	}, {
		backgroundColor: "rgba(255,129,156,0.2)",
		borderColor: "rgba(255,129,156,1)"
	}];
	$scope.options = {
		legend: {
			display: true
		},
		scale: {
			ticks: {
				max: 100,
				min: 0,
				stepSize: 20
			}
		}
	}
});

app.controller("BubbleCtrl", function($scope) {
	$scope.data = [
		[{
			x: -5,
			y: -3,
			r: 20
		}, {
			x: 8,
			y: 10,
			r: 10
		}, {
			x: -4,
			y: 6,
			r: 12
		}],
		[{
			x: -4,
			y: -2,
			r: 18
		}, {
			x: 6,
			y: 7,
			r: 15
		}, {
			x: -6,
			y: 6,
			r: 8
		}]
	];
	$scope.datasetOverride = [{
		label: "scatter A",
		backgroundColor: "rgba(165,220,230,0.6)",
		borderColor: "rgba(165,220,230,1)"
	}, {
		label: "scatter B",
		backgroundColor: "rgba(255,129,156,0.6)",
		borderColor: "rgba(255,129,156,1)"
	}];
	$scope.options = {
		legend: {
			display: true
		}
	}
});

app.controller("MixChartCtrl", function($scope) {
	$scope.labels = ['2016-4', '2016-5', '2016-6', '2016-7', '2016-8',
		'2016-9', '2016-10'
	];
	$scope.data = [
		[5, 20, 30, 80, 85, 90, 92],
		[20, 18, 12, 8, 5, 3, 1]
	];
	$scope.colors = ['#5bc0de', '#ec971f'];
	$scope.datasetOverride = [{
		label: "Series a",
		type: 'bar',
		yAxisID: 'y-axis-1'
	}, {
		label: "Series b",
		type: 'line',
		yAxisID: 'y-axis-2'
	}];
	$scope.options = {
		legend: {
			display: true
		},
		scales: {
			yAxes: [{
				id: 'y-axis-1',
				type: 'linear',
				position: 'left',
				ticks: {
					max: 100,
					min: 0,
					stepSize: 20
				}
			}, {
				id: 'y-axis-2',
				type: 'linear',
				position: 'right',
				ticks: {
					max: 25,
					min: 0,
					stepSize: 5
				}
			}]
		}
	}
});

app.controller('StackedBarCtrl', function($scope) {
	$scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
		'Saturday', 'Sunday'
	];
	$scope.type = 'StackedBar';

	$scope.data = [
		[65, 59, 90, 81, 56, 55, 40],
		[28, 48, 40, 19, 96, 27, 100]
	];
});

app.controller('TabsCtrl', function($scope) {
	$scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
		'Saturday', 'Sunday'
	];
	$scope.active = true;
	$scope.data = [
		[65, 59, 90, 81, 56, 55, 40],
		[28, 48, 40, 19, 96, 27, 100]
	];
});

app.controller('DataTablesCtrl', function($scope) {
	$scope.labels = ['January', 'February', 'March', 'April', 'May', 'June',
		'July'
	];
	$scope.data = [
		[65, 59, 80, 81, 56, 55, 40],
		[28, 48, 40, 19, 86, 27, 90]
	];
	$scope.colours = [{ // grey
		fillColor: 'rgba(148,159,177,0.2)',
		strokeColor: 'rgba(148,159,177,1)',
		pointColor: 'rgba(148,159,177,1)',
		pointStrokeColor: '#fff',
		pointHighlightFill: '#fff',
		pointHighlightStroke: 'rgba(148,159,177,0.8)'
	}, { // dark grey
		fillColor: 'rgba(77,83,96,0.2)',
		strokeColor: 'rgba(77,83,96,1)',
		pointColor: 'rgba(77,83,96,1)',
		pointStrokeColor: '#fff',
		pointHighlightFill: '#fff',
		pointHighlightStroke: 'rgba(77,83,96,1)'
	}];
	$scope.randomize = function() {
		$scope.data = $scope.data.map(function(data) {
			return data.map(function(y) {
				y = y + Math.random() * 10 - 5;
				return parseInt(y < 0 ? 0 : y > 100 ? 100 : y);
			});
		});
	};
});

app.controller('TicksCtrl', ['$scope', '$interval',
	function($scope, $interval) {
		var maximum = 200;
		$scope.data = [
			[]
		];
		$scope.series = ['Ticks'];
		$scope.labels = [];
		$scope.options = {
			animation: false,
			showScale: false,
			showTooltips: false,
			pointDot: false,
			datasetStrokeWidth: 0.5,
			scales: {
				yAxes: [{
					id: 'y-axis-1',
					type: 'linear',
					display: true,
					position: 'left',
					//设置y轴最小值为0，最大值为100，每个刻度大小为10
					ticks: {
						max: 100,
						min: 0,
						stepSize: 10
					}
				}]
			}
		};

		//间隔0.1秒刷新一次数据
		$interval(function() {
			getLiveChartData();
		}, 100);

		function getLiveChartData() {
			if ($scope.data[0].length) {
				$scope.labels = $scope.labels.slice(1);
				$scope.data[0] = $scope.data[0].slice(1);
			}

			while ($scope.data[0].length < maximum) {
				$scope.labels.push('');
				$scope.data[0].push(getRandomValue($scope.data[0]));
			}
		}
	}
]);

function getRandomValue(data) {
	var l = data.length,
		previous = l ? data[l - 1] : 50;
	var y = previous + Math.random() * 10 - 5;
	return y < 0 ? 0 : y > 100 ? 100 : y;
}