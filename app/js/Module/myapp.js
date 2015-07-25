


 var myapp = angular.module('MyApp', []);

        myapp.controller('timer',['$scope', '$interval', function($scope, $interval){
          /*
          ///////////////////////TIMER
          */
          $scope.starttime = 2000; // 25min in ms
          $scope.format = 'mm:ss'; //minutes and seconds format 
          var start; //variable holder for start interval 
          
          $scope.starttimer = function(){
            start = $interval(function(){
              $scope.starttime -=1000; //starttime is equal to starttime - 1 second
                if($scope.starttime === 0){// if starttime is = 0 return 25
                  //$scope.starttime = 1500000; //reset back to 25 min
                  $interval.cancel(start); //stop timer at 0
                  $scope.breaktime = 3000; //set breaktime to 5min
                  $scope.playAlarm(); //play alarm
                  alert("Break time.");
                }
                
            },1000);
          } //end starttimer function
          
          $scope.killtimer = function(starttimer){ //inject starttimer as dependency bc we want to access start
            return $interval.cancel(start);// turn off start
          }
          
          $scope.resettimer = function(starttimer){
            $interval.cancel(start); //turn off start aka timer
            $scope.starttime = 1500000; // set to 25 min
          }
          
          /*
           ////////////////////////BREAK TIMER
          */
          $scope.breaktime = 3000;// 5 min 
          var breakstart; //variable holder for break start $interval
          
          $scope.startbreak = function(){
            breakstart = $interval(function(){
              $scope.breaktime -=1000; // breaktime is = to breaktime - 1 sec
              if($scope.breaktime === 0){
                $interval.cancel(breakstart);
                $scope.starttime = 2000; //reset timer to 25 min after breaktime === 0
                $scope.workSesh +=1; // Complete 1 work session
                $scope.playAlarm(); //play alarm
                //alert("work session is" + $scope.workSesh);
              }
            },1000);//end breakstart
          } //end startbreak function
          
          $scope.resetbreak = function(startbreak){ //inject startbreak to access breakstart
            $interval.cancel(breakstart); //cancel breakstart timer
            $scope.breaktime = 300000; // set break back to 5min
          }
          /*
          /////////////////////WORK SESSIONS + 30 MIN BREAK TIMER
          */
          
          $scope.workSesh = 0; //work session
          
          $scope.thrtybrk = 5000; //30 min
          var thrtybrkStart; // var holder for 30 min break $interval
          
          $scope.startThirtyMinTimer = function(){
            thrtybrkStart = $interval(function(){
              $scope.thrtybrk -= 1000; // 30 min break is equal to 30 min - 1 sec
              if($scope.thrtybrk === 0){
                $interval.cancel(thrtybrkStart);//stop 30min break timer
                $scope.starttime = 2000; //reset timer to 25 min after 30 min break
                workSesh = 0; // reset workSesh to 0
                $scope.playAlarm(); //play alarm
              }
            },1000);
          }// end 30 min timer
        /*
        ///////////////////////ALARM Player
        */
        var alarm = new buzz.sound('app/assets/213149__radiy__8bit-style-bonus-effect.wav',{
          preload: true
        });
        
        $scope.playAlarm = function(){
          return alarm.play();
        }
          
        }]);// END OF TIMER CONTROLLER



      /****************************************
      /////// FINISHED TASKS CONTROLLER ///////
      ****************************************/

      myapp.controller('finishedTasks',function($scope){
      $scope.tasks =[
        {'title':'Go to the gym'}
        ];
      
       $scope.addTask=function(task){
       $scope.tasks.push({'title':$scope.newtask});
       $scope.newtask='';
      }
      
      $scope.clearTasks = function(){
        $scope.tasks = $scope.tasks.filter(function(task){
          $scope.tasks=[{}];
        })
      }
    }); ///////// END FINISHED TASKS CONTROLLER 