angular.module('TimeCounter', [])
  .controller('CounterController', function($scope,$interval) {
     
    $scope.projectname =null;
    $scope.projects = JSON.parse(window.localStorage.getItem('projects')) || [];
    
   
  
    $scope.addProject = function(){
          var project = {
          name:'',
          acumulated:[],
          Work: 0,
          seconds:00,
          minutes:00,
          hours:00,
          run:false,
          iconClass:'glyphicon glyphicon-play buttonIcon'
          };

      project.name= $scope.projectname || 'My task '  + $scope.projects.length;
      $scope.projects.push(project);
      window.localStorage.setItem('projects',JSON.stringify($scope.projects));

    };
    
    $scope.click = function(indice){

        

        if(!$scope.projects[indice].run){
          
          $scope.projects[indice].iconClass = 'glyphicon glyphicon-pause buttonIcon';
          $scope.projects[indice].run = true;
          $scope.projects[indice].acumulated.push(new Date);
          window.localStorage.setItem('projects',JSON.stringify($scope.projects));

      
        }else{
          $scope.projects[indice].iconClass = 'glyphicon glyphicon-play buttonIcon';
          $scope.projects[indice].run = false;
          $scope.projects[indice].acumulated.push(new Date); 
          
          if(angular.equals(typeof($scope.projects[indice].acumulated[0]),'string')){
            $scope.projects[indice].acumulated[0]= new Date($scope.projects[indice].acumulated[0]);
          }

          //var temp = $scope.projects[indice].acumulated[1].getTime() - $scope.projects[indice].acumulated[0].getTime();
         /* $scope.projects[indice].Work = 
              ($scope.projects[indice].Work - $scope.projects[indice].acumulated[0].getTime()) 
              + ( temp - $scope.projects[indice].Work );  */
         
          $scope.projects[indice].acumulated = [];
          
          

          
          toTime(indice); 
          window.localStorage.setItem('projects',JSON.stringify($scope.projects));

        }
        
    };

    function toTime(indice){


      $scope.projects[indice].seconds = parseInt($scope.projects[indice].Work / 1000);

      if(($scope.projects[indice].seconds % 60) >=0){
        $scope.projects[indice].minutes = parseInt($scope.projects[indice].seconds /60);
       $scope.projects[indice].seconds = $scope.projects[indice].seconds %60;
       

        if(($scope.projects[indice].minutes%60) >=0){
          $scope.projects[indice].hours = parseInt($scope.projects[indice].minutes/60);
          $scope.projects[indice].minutes =$scope.projects[indice].minutes%60;
        }
      }

    }
  
    $scope.delete = function(indice){
      $scope.projects.splice(indice,1);
     window.localStorage.setItem('projects',JSON.stringify($scope.projects));

    };

    function updateTimers(){
      angular.forEach($scope.projects, function(val, index){
              if(val.run === true){
                $scope.projects[index].Work = parseInt($scope.projects[index].Work)  + 1000 ;
                toTime(index);
              }
        });
    }

    function AdjuntsBackground(){
       angular.forEach($scope.projects, function(val, indice){
              if(val.run === true){
                var temp = (new Date).getTime() - new Date($scope.projects[indice].acumulated[0]).getTime();
                $scope.projects[indice].Work = $scope.projects[indice].Work +  temp ;
              }
        });
      }
      
    AdjuntsBackground();
 
  
    $interval(function() {
          updateTimers();
        }, 1000);
     
       

        

    

 });