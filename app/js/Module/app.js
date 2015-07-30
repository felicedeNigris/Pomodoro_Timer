


 var myApp = angular.module('myApp',['firebase', 'ngRoute']);



myApp.service('tasksService',['$firebaseArray', function($firebaseArray){

  //point to my firebase object
  var ref = new Firebase("https://tomato-timer.firebaseio.com/");

  //download tasks into a local array
  var tasksFref = $firebaseArray(ref);

  
    //get firebase object
  this.returnTasks = function(){
    return tasksFref;
  };

  this.addtaskSrvc = function(newTask){ // Add title and new task
      return tasksFref.$add({'title': newTask}); //add to array
  };
  //Remove from firebase array
  this.cleartasksSrvc = function(){
    tasksFref.forEach(function(task){
      return tasksFref.$remove(task);
    });
  };
}]); // end service
  
  myApp.controller('timer',['$scope', '$interval', function($scope, $interval){
    /*
    ///////////////////////TIMER
    */
    $scope.startTime = 1500000; // 25min in ms
    $scope.format = 'mm:ss'; //minutes and seconds format 
    var start; //variable holder for start interval 
    
    $scope.startTimer = function(){
      start = $interval(function(){
        $scope.startTime -=1000; //startTime is equal to startTime - 1 second
          if($scope.startTime === 0){// if startTime is = 0 return 25
            //$scope.startTime = 1500000; //reset back to 25 min
            $interval.cancel(start); //stop timer at 0
            $scope.breakTime = 300000; //set breakTime to 5min
            $scope.playAlarm(); //play alarm
            alert("Break time.");
          }
          
      },1000);
    }; //end startTimer function
    
    $scope.killTimer = function(startTimer){ //inject startTimer as dependency bc we want to access start
      return $interval.cancel(start);// turn off start
    };
    
    $scope.resetTimer = function(startTimer){
      $interval.cancel(start); //turn off start aka timer
      $scope.startTime = 1500000; // set to 25 min
    };
    
    /*
     ////////////////////////BREAK TIMER
    */
    $scope.breakTime = 300000;// 5 min 
    var breakStart; //variable holder for break start $interval
    
    $scope.startBreak = function(){
      breakStart = $interval(function(){
        $scope.breakTime -=1000; // breakTime is = to breakTime - 1 sec
        if($scope.breakTime === 0){
          $interval.cancel(breakStart);
          $scope.startTime = 1500000; //reset timer to 25 min after breakTime === 0
          $scope.workSesh +=1; // Complete 1 work session
          $scope.playAlarm(); //play alarm
          //alert("work session is" + $scope.workSesh);
        }
      },1000);//end breakStart
    }; //end startBreak function
    
    $scope.resetBreak = function(startBreak){ //inject startBreak to access breakStart
      $interval.cancel(breakStart); //cancel breakStart timer
      $scope.breakTime = 300000; // set break back to 5min
    };
    /*
    /////////////////////WORK SESSIONS + 30 MIN BREAK TIMER
    */
    
    $scope.workSesh = 0; //work session
    
    $scope.thrtyBrk = 1800000; //30 min
    var thrtybrkStart; // var holder for 30 min break $interval
    
    $scope.startThirtyMinTimer = function(){
      thrtybrkStart = $interval(function(){
        $scope.thrtyBrk -= 1000; // 30 min break is equal to 30 min - 1 sec
        if($scope.thrtyBrk === 0){
          $interval.cancel(thrtybrkStart);//stop 30min break timer
          $scope.startTime = 1500000; //reset timer to 25 min after 30 min break
          $scope.thrtyBrk = 1800000; //reset 30 min timer to 30 min
          $scope.workSesh = 0; // reset workSesh to 0
          $scope.playAlarm(); //play alarm
      }
    },1000);


    $scope.resetThrtybreak = function(startThirtyMinTimer){ //inject startbreak to access breakstart
      $interval.cancel(thrtybrkStart); //cancel breakstart timer
      $scope.thrtyBrk = 300000; // set break back to 5min
    };

    };// end 30 min timer
  /*
  ///////////////////////ALARM Player
  */
      var alarm = new buzz.sound('app/assets/213149__radiy__8bit-style-bonus-effect.wav',{
      preload: true
    });
    
    $scope.playAlarm = function(){
      return alarm.play();
    };
    
  }]);// END OF TIMER CONTROLLER



/****************************************
/////// FINISHED TASKS CONTROLLER ///////
****************************************/

myApp.controller('finishedTasks',['$scope', 'tasksService',function($scope,tasksService){
  //$scope.newTask;

  $scope.tasks = tasksService.returnTasks();


  $scope.addTask=function(){
    tasksService.addtaskSrvc($scope.newTask);
    $scope.newTask = ''; //empties out the form 
  };

  $scope.clearTasks = function(){
    tasksService.cleartasksSrvc();
  };

}]); ///////// END FINISHED TASKS CONTROLLER 