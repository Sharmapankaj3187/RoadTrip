# RoadTrip Application Introduction

## Getting Started

RoadTrip

Roadtrip is a trip planner website, aimed to make planning for trip easy and hassle free. This website is built on ItemMirror framework, which displays the dropbox folder structure. The trips data and information can be organised into folders.

This website also provides an additional feature of reordering the folders as per user needs. This website provides an intuitive interface for adding folders and information. Website URLs can also be stored using phantom associations. This website provides a interactive feature of searching information on the web and store it inside the folders.

### Ordering Horizontal Service Integration 

ui-sortable installation 

(This service is on github, for details please visit: https://github.com/angular-ui/ui-sortable)

Step 1. Load the jquery script file if you don’t have it in your app already. 

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>

Attention: it usually goes into index.html file and it needs to go before angular.js 

script. 

Attention: it needs to be out of the <!--bower:js-->  chunk of scripts otherwise bower 

will keep removing it.

Step 2. Load the script file: sortable.js in your application:

<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-

sortable/0.13.3/sortable.js"></script>

Attention: this usually goes into your index.html file; 

Attention: it needs to be out of the <!--bower:js-->  chunk of scripts otherwise bower 

will keep removing it.

Step 3. Add the sortable module as a dependency to your application module:

var myAppModule = angular.module('MyApp', ['ui.sortable'])

Attention: please make sure you find the proper place for the dependency. In the demo app, 

it is the app.js file where all the dependencies are added.

Step 4. Apply the directive to your form elements:

<ul ui-sortable="sortableOptions"  ng-model="items">

  <li ng-repeat="item in items">{{ item }}</li>

</ul>

Attention: above are examples and you need to look into your code to apply it correctly. 

In the demo app, this code is in explorer.html. “ui-sortable” directive should go to the 

code above the ng-repeat code, and “items” should be replaced with your array’s name, in 

the demo app, it is “associations”.

Persistence Code

Step 1. Create namespace attribute “order” in item-mirror.js file (app/scripts/services)

Insert the below code in item-mirror.js file, can be right after the code for “customColor” attribute.

get order(){ return mirror.getAssociationNamespaceAttribute('order', guid, 'MyJobsApp'); },

set order(newOrder){ mirror.setAssociationNamespaceAttribute('order', newOrder, guid, 

'MyJobsApp'); },

Step 2.  Code to sort the array according to “order” namespace attribute before ng-repeat reads it.

Insert the code in RED into the proper place in your controller file (explorer.js).

var init = itemMirror.initialize;

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

       }

      function _localItemCompare(a,b){

      if (a.order>b.order) return 1;

      else if (a.order<b.order) return -1;

      else return 0;

    }

Step 3. Code to pass the value to the “order” namespace attribute after the array is reordered.

Insert the blow code into your controller file. (explorer.js)

$scope.sortableOptions = {

        stop: function(e, ui) {

          var reorderLog = $scope.associations.map(function(assoc){

          return assoc.localItem

     }).join(', ');

      var i=1;

      $scope.associations.forEach(function (assoc){

        assoc.order =i;

        i = i + 1;

      });

      $scope.save();

    }

  };

Attention: please make sure the punctuation marks, parentheses, brackets are not missed 

and correctly paired, one missing sign will make the whole app not working properly.
