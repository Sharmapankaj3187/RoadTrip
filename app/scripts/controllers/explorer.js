'use strict';

/**
 * @ngdoc function
 * @name itemMirrorAngularDemoApp.controller:ExplorerCtrl
 * @description
 * # ExplorerCtrl
 * Controller of the itemMirrorAngularDemoApp
 */
angular.module('itemMirrorAngularDemoApp')
  .controller('ExplorerCtrl', function ($scope, itemMirror) {
  	// starts everything up after dropbox loads
  	var init = itemMirror.initialize;

    /*Search code starts*/
    /*$scope.clickFun = function ($event) {
              
              if(event.target.getAttribute('data-ctorig')) {
                var myClickedLink = event.target.getAttribute('data-ctorig');
              } else if($(event.target).parent().attr('data-ctorig')) {
                var myClickedLink = $(event.target).parent().attr('data-ctorig');
              }

              if(event){
                event.stopPropagation();
                event.preventDefault();
              }
              //check for duplicate entries
              var keepGoing = true;
              
              for(var i=0 ; i <= $scope.allOptions.length; i++) {
                if(keepGoing && myClickedLink != null) {
                  if($scope.allOptions[i] == myClickedLink){
                  alert(myClickedLink+" exists in your list.");
                  keepGoing = false;
                  }
                  else
                  {
                  $scope.arrPush(myClickedLink);
                  alert(myClickedLink+" added to your list.");
                  keepGoing = false;
                  }
              }
            }
            };
            */


            /* This is the new code */
            $scope.clickFun = function ($event) {
          if(event.target.getAttribute('data-ctorig')) {
            var myClickedLink = event.target.getAttribute('data-ctorig');
          } else if($(event.target).parent().attr('data-ctorig')) {
            var myClickedLink = $(event.target).parent().attr('data-ctorig');
          }

          if(event){
            event.stopPropagation();
            event.preventDefault();
          }
          
          //check for duplicate entries
          var keepGoing = true;
          var linkExists;
          
              if(keepGoing && myClickedLink != null) {
              for(var i=0 ; i <= $scope.allOptions.length; i++) {
              if($scope.allOptions[i] == myClickedLink){
              alert(myClickedLink+" exists in your list.");
              keepGoing = false;
              linkExists = "true";
              }
            }
              if(linkExists != "true")
              {
              $scope.arrPush(myClickedLink);
              alert(myClickedLink+" added to your list.");
              keepGoing = false;
              }
          }
        };


            //aditi
    $scope.allOptions = [];
    $scope.arrPush = function(myClickedLink){
      //check if the myClickedLink already exists in your array. Because you don't want to allow for duplicates
      $scope.allOptions.push(myClickedLink);
    }

    $scope.arrFun = function ($event) {

        var lb = "• "; // used for console.log()
        //var myApp = angular.module("myApp", []);

      $scope.title = 'AngularJS Checkboxes Bound to Target Array with Initial Selections Checked';
      $scope.content = '';

      $scope.isChecked = function(id){
          var match = false;
          for(var i=0 ; i < $scope.data.length; i++) {
            if($scope.data[i].id == id){
              match = true;
            }
          }
          return match;
      };
    }    
    //working aditi
    $scope.data = [];

    //test ashay
    //$scope.data = {};

      $scope.sync = function(bool, item, displayText){
        
        var assocItem = {};
        assocItem.link = item;
        assocItem.displayText = displayText;
        if(bool){
          // add item
          $scope.data.push(assocItem);
        } else {
          // remove item
          for(var i=0 ; i < $scope.data.length; i++) {
            if($scope.data[i].id == item.id){
              $scope.data.splice(i,1);
            }
          }      
        }
      };


    $scope.saveLinks = function($event){
      
      for(var i=0 ; i <= $scope.data.length; i++) {
            
            $scope.phantomRequest.displayText = $scope.data[i].displayText;
            $scope.phantomRequest.itemURI = $scope.data[i].link;
            $scope.createPhantom();
            }
          } 

      /*Search code ends*/

  	init.then(function() {
      $scope.mirror = itemMirror;
      $scope.associations = itemMirror.associations;
      $scope.associations.sort(_localItemCompare);
      $scope.selectedAssoc = null;

      // This needs to be called after the service updates the associations.
      // Angular doesn't watch the scope of the service's associations, so any
      // updates don't get propogated to the front end.
      function assocScopeUpdate() {
        $scope.associations = itemMirror.associations;
        $scope.associations.sort(_localItemCompare);
        $scope.selectedAssoc = null;
       };

      function _localItemCompare(a,b){
      if (a.order>b.order) return 1;
      else if (a.order<b.order) return -1;
      else return 0;
    };

      $scope.deleteAssoc = function(guid) {
        itemMirror.deleteAssociation(guid).
        then(assocScopeUpdate);
      };

      // inserted for saving the orders
  
  $scope.sortableOptions = {
    
    
    stop: function(e, ui) {
      //this callback has the changed model
    var reorderLog = $scope.associations.map(function(assoc){
      
    return assoc.localItem

     }).join(', ');

      var i=1;
      $scope.associations.forEach(function (assoc){
        assoc.order =i;
        i = i + 1;
      });

      $scope.save();

     // $scope.sortingLog.push('Stop: ' + logEntry);
    }
  };
//});

      $scope.navigate = function(guid) {
        itemMirror.navigateMirror(guid).
        then(assocScopeUpdate);
      };

      $scope.previous = function() {
        itemMirror.previous().
        then(assocScopeUpdate);
      };

      $scope.save = function() {
        itemMirror.save().
        then(assocScopeUpdate);
      };

      $scope.refresh = function() {
        itemMirror.refresh().
        then(assocScopeUpdate);
      };

      // Only one association is ever selected at a time. It has the boolean
      // selected property, to allow for unique styling
      $scope.select = function(assoc) {
        if ($scope.selectedAssoc) {
          $scope.selectedAssoc.selected = false;
        }
        $scope.selectedAssoc = assoc;
        $scope.selectedAssoc.selected = true;
      };

      // Phantom Creation Section

      // This is used to intially set the values, and reset them after we create a phantom.
      // We don't want the same information stuck in those boxes after creating them
      function resetPhantomRequest() {
        $scope.phantomRequest.displayText = '';
        $scope.phantomRequest.itemURI = '';
        $scope.phantomRequest.localItemRequested = false;
      }

      $scope.phantomRequest = {};
      resetPhantomRequest();

      $scope.createPhantom = function() {
        itemMirror.createAssociation($scope.phantomRequest).
        then( function() {
          switchToAssocEditor();
          assocScopeUpdate();
          resetPhantomRequest();
        });
      };

      // Folder Creation Section, nearly the exact same as the phanbom request,
      // with a few minor differences
      function resetFolderRequest() {
        $scope.folderRequest.displayText = '';
        $scope.folderRequest.localItem = '';
        $scope.folderRequest.isGroupingItem = true;
      }

      $scope.folderRequest = {};
      resetFolderRequest();

      $scope.createFolder = function() {
        itemMirror.createAssociation($scope.folderRequest).
        then( function() {
          switchToAssocEditor();
          assocScopeUpdate();
          resetFolderRequest();
        });
      };

      // default section for our editing panel
      function switchToAssocEditor() {
        $scope.editSection = 'assoc-editor';
      }

      switchToAssocEditor();

      // Function used to show display text succinctly
      $scope.matchFirstLn = function(str) {
        var first = /.*/;
        return first.exec(str)[0];
      };

    });
  });
