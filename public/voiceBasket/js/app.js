"use strict";window.ng=window.angular;var _dependencies=["ngMaterial","ngRoute","angular-loading-bar"],app=ng.module("app",_dependencies);app.run(["$rootScope","$location",function(e){var t="Home";e.$on("$routeChangeSuccess",function(n,o){if(o.locals&&o.locals.hasOwnProperty("currentSection")&&o.locals.currentSection.hasOwnProperty("title"))return void(e.title=o.locals.currentSection.title||t);e.title=o.$$route.title||t})}]),app.controller("baseController",["$scope",function(e){console.log("baseController called")}]),ng.module("app").provider("api",[function(){this.$get=["$http","BASE_URL","currentUser",function(e,t,n){function o(e){return e.replace(/([A-Z])/g,function(e){return"_"+e.toLowerCase()})}var r=function(r,i,a){a=ng.isObject(a)?a:{},angular.forEach(a,function(e,t){var n={};angular.forEach(e,function(e,t){this[o(t)]=e},n),a[t]=n});var s=i;return a.url="http://"+t+"/"+s,a.method=r,a.headers=a.headers||{},a.headers.hasOwnProperty("sessionId")||ng.extend(a.headers,{sessionId:n.getAuthToken()}),e(a).then(function(e){return e.data},function(e){return console.log("ERROR OCCURRED"),e.data})};return["GET","PUT","POST","DELETE"].forEach(function(e){r[e.toLowerCase()]=function(t,n){return r(e,t,n)}}),r}]}]),ng.module("app").provider("cache",[function(){this.$get=[function(){var e=function(t,n,o){return 1===arguments.length?e.get(t):2===arguments.length?e.set(t,n):3===arguments.length?e.set(t,n,o):void 0};return e._hash={},e.set=function(t,n,o){delete e._hash[t];var r={val:n,lifetime:ng.isNumber(o)?o:-1,timestamp:(new Date).getTime()};return localStorage.setItem(t,ng.toJson(r)),this},e.get=function(t){if(e._hash.hasOwnProperty(t))return ng.copy(e._hash[t]);var n=JSON.parse(localStorage.getItem(t));return n?-1!==n.lifetime&&(new Date).getTime()-n.timestamp>n.lifetime?(e.remove(t),null):(e._hash[t]=n.val,ng.copy(n.val)):null},e.lifetime=function(t){return function(t,n){return e(t,n)}},e.remove=function(t){return delete e._hash[t],localStorage.removeItem(t),this},e.flush=function(){e._hash={},localStorage.clear()},e}]}]),app.service("currentUser",["session","$rootScope",function(e,t){this.isLoggedIn=function(){return!!e.auth_token()},this.user=function(){return e.user()},this.setUser=function(t){e.setUser(t)},this.setToken=function(t){e.setToken(t)},this.getAuthToken=function(){return e.auth_token()}}]),ng.module("app").constant("BASE_URL","107.170.11.184"),ng.module("app").provider("session",[function(){this.$get=["cache",function(e){return{setObject:function(t,n){e(t,n)},getObject:function(t){return e(t)},setUser:function(t){e("auth.user",t)},setToken:function(t){e("auth.token",t)},user:function(){return e("auth.user")},auth_token:function(){return e("auth.token")},setNextStep:function(t){e("next.step",t)},getNextStep:function(){return e("next.step")},purgeList:function(t){angular.forEach(t,function(t){e.remove(t)})},clear:function(){var t=["auth.user","auth.token"];return angular.forEach(t,function(t){e.remove(t)}),this}}}]}]),angular.module("app").run(["$templateCache",function(e){e.put("/voiceBasket/base.html","<div id=loading-bar-spinner><div class=bar><div class=peg></div></div></div><div layout=column><ng-include src=\"'/voiceBasket/header/headerTemplate.html'\"></ng-include><md-content><ng-include src=currentTemplate></ng-include></md-content></div>"),e.put("/voiceBasket/artistRequest/artistRequestTemplate.html",'<div ng-controller=artistRequestController layout=column layout-align="center center" class=vb-raq><h1>Request A Quote</h1><form name=requestForm ng-submit=submit() layout=column><md-input-container><label for=type>Type</label><md-select id=type ng-model=request.type><md-option ng-repeat="type in types" ng-value=type>{{ type }}</md-option></md-select></md-input-container><div layout=row layout-align="space-between center"><md-input-container layout=row layout-align="space-between center"><p><strong>Language</strong></p><p ng-bind=selectedAudios[0].audioClip.language></p></md-input-container><md-input-container layout=row><p><strong>Voice Over Type</strong></p><p ng-bind=selectedAudios[0].audioClip.voiceOverType></p></md-input-container></div><md-input-container layout=column layout-align="space-between center"><div ng-repeat="audio in selectedAudios" layout=row layout-align="space-between center"><p><strong>Artist Code</strong></p><p ng-bind=audio.audioClip.code></p></div></md-input-container><md-input-container ng-if="request.type === \'Audio-books\'"><label for=bookName>Name of the book</label> <input id=bookName type=text ng-model=request.bookName></md-input-container><div layout=column ng-if="request.type === \'Commercial\'"><md-input-container><label for=chars>No of Characters</label> <input id=chars type=number ng-model=charactersCount></md-input-container><div ng-show="charactersCount !== 0" layout=column><p>Artist Allocation</p><md-input-container ng-repeat="num in range(charactersCount)"><label for=charsAlloc>Character {{ num + 1 }}</label><md-select id=charsAlloc ng-model=request.characters[num]><md-option ng-repeat="audio in selectedAudios" ng-value=audio.id>{{ audio.artist.name }}</md-option></md-select></md-input-container></div></div><md-input-container ng-if="request.type === \'IVR\'"><label for=messagesCount>No of Messages</label> <input id=messagesCount type=number ng-model=request.messagesCount></md-input-container><md-input-container><label for=duration>Duration (mins)</label> <input id=duration type=number ng-model=request.duration></md-input-container><md-input-container><label for=wordCount>No of Words</label> <input id=wordCount type=number ng-model=request.wordCount></md-input-container><md-input-container ng-if="request.type === \'Commercial\'"><label for=broadcast>Broadcast Type</label><md-select id=broadcast ng-model=request.broadCastType><md-option ng-repeat="type in [\'TV\', \'Radio\']" ng-value=type>{{ type }}</md-option></md-select></md-input-container><md-input-container><label for=scriptText>Copy/Paste Script</label> <textarea id=scriptText ng-model=request.scriptText></textarea></md-input-container><md-input-container><label for=scriptUrl>Upload Script Url</label> <input type=url id=scriptUrl ng-model=request.scriptUrl></md-input-container><md-input-container><label for=notes>ADD NOTES FOR ARTIST (DIRECTION, TIMINGS, PRONUNCIATION, VIDEO LINKS etc.)</label> <textarea id=notes ng-model=request.notes></textarea></md-input-container><md-input-container layout=row><md-button ng-click=submit() flex=100>Request</md-button></md-input-container></form></div>'),e.put("/voiceBasket/artistSearch/artistSearchTemplate.html",'<div ng-controller=artistSearchController layout=column class=vb-search><h1>Search An Artist</h1><div layout=row layout-align="center center" layout-padding layout-margin class=vb-search-bar><md-input-container ng-repeat="prop in filtersArray | orderBy: \'key\'"><label for=filter style="color: #000;">{{ prop.key | removeDoubleUnderscores | camelCaseToSpace | uppercase }}</label><md-select id=filter ng-disabled="isDisabled(renderOptionName(\'removeDoubleUnderscores\', prop.key))" ng-model="selectedFilter[renderOptionName(\'removeDoubleUnderscores\', prop.key)]"><md-option ng-value=filter ng-repeat="filter in prop.val">{{ filter }}</md-option></md-select></md-input-container></div><div layout=column layout-align="center center" class=vb-search-result><md-checkbox ng-repeat="audio in audios" ng-model=selectedAudios[audio.id]><div layout=column><audio controls><source src=https://www.w3schools.com/html/horse.mp3 type=audio/mpeg>Your browser does not support the audios.</audio><div layout=row layout-align="space-between center"><p>{{ audio.artist.name }}</p><p>{{ audio.audioClip.voiceOverType }}</p></div></div></md-checkbox></div><div layout=row layout-align="center center"><md-button ng-click=goToRAQ()>Request a Quote</md-button></div></div>'),e.put("/voiceBasket/dashboard/dashboardTemplate.html",'<div ng-controller=dashboardController layout=column><div ng-repeat="request in dashboardData.artistRequest">{{ request.request.scriptText }}</div></div>'),e.put("/voiceBasket/header/headerTemplate.html",'<div layout=row class=vb-header ng-controller=headerController><div flex=40 layout=column layout-align=center><p>VOICE BASKET</p></div><div flex layout=row><ul layout-padding flex layout=row layout-align=end layout-margin><li ng-repeat="option in menu"><a ng-href="{{ option.link }}">{{ option.name }}</a></li></ul></div></div>'),e.put("/voiceBasket/home/homeTemplate.html",'<div layout=column class=vb-home layout-align="end center"><h1>Welcome to Voice Basket</h1><md-button ng-click="goTo(\'/search\')">Book An Artist</md-button></div>'),e.put("/voiceBasket/login/loginTemplate.html",'<div layout=column layout-align="center center" ng-controller=loginController class=vb-login><h2>Login</h2><form name=loginForm layout=column ng-submit=login()><md-input-container><label for=email>Email</label> <input type=email id=email ng-model=user.email></md-input-container><md-input-container><label for=password>Password</label> <input type=password id=password ng-model=user.password></md-input-container><md-input-container layout=row layout-align="center center"><md-button ng-click=login()>Login</md-button></md-input-container><div layout=column layout-align="center center"><a href=/sign-up>Don\'t have an account?</a></div></form></div>'),e.put("/voiceBasket/signUp/signUpTemplate.html",'<div layout=column layout-align="center center" ng-controller=signUpController class=vb-signUp><h2>Sign Up</h2><form name=signUpForm layout=column ng-submit=signUp()><md-input-container><label for=name>Name</label> <input type=text id=name ng-model=user.name></md-input-container><md-input-container><label for=companyName>Company Name</label> <input type=text id=companyName ng-model=user.companyName></md-input-container><md-input-container><label for=mobile>Mobile</label> <input type=text id=mobile ng-model=user.mobile></md-input-container><md-input-container><label for=email>Email</label> <input type=email id=email ng-model=user.email></md-input-container><md-input-container><label for=password>Password</label> <input type=password id=password ng-model=user.password></md-input-container><md-input-container layout=row layout-align="center center"><md-button ng-click=signUp()>Sign Up</md-button></md-input-container></form></div>')}]),app.constant("endPoints",{user:"account/user",dashboard:"account/dashboard",filters:"artist/search/options",artistList:"/artist/audio/list"}),function(){function e(e,t){this.register=function(n){return e.post(t.user,{data:n})},this.login=function(n){return e.put(t.user,{data:n})},this.getDashboardData=function(){return e.get(t.dashboard)}}app.service("accountService",["api","endPoints",e])}(),function(){function e(e,t){this.selectedAudios=null,this.audios=null,this.getFilters=function(){return e.get(t.filters)},this.getArtistList=function(){return e.get(t.artistList)},this.parseSelectedAudios=function(){var e=[];return angular.forEach(this.selectedAudios,function(e,t){e&&this.push(parseInt(t))},e),e},this.getArtistRequestPayload=function(){var e=this,t=e.parseSelectedAudios(e.selectedAudios);return e.audios.filter(function(e){return t.indexOf(e.id)>-1})}}app.service("artistService",["api","endPoints",e])}(),app.config(["$routeProvider","$locationProvider",function(e,t){e.when("/",{controller:"voiceBasketBaseController",templateUrl:"/voiceBasket/base.html",title:"Home",resolve:{currentSectionTemplate:function(){return"home/homeTemplate.html"}}}).when("/raq",{controller:"voiceBasketBaseController",templateUrl:"/voiceBasket/base.html",title:"Request a Quote",resolve:{currentSectionTemplate:function(){return"artistRequest/artistRequestTemplate.html"}}}).when("/search",{controller:"voiceBasketBaseController",templateUrl:"/voiceBasket/base.html",title:"Search An Artist",resolve:{currentSectionTemplate:function(){return"artistSearch/artistSearchTemplate.html"}}}).when("/login",{controller:"voiceBasketBaseController",templateUrl:"/voiceBasket/base.html",title:"Login",resolve:{currentSectionTemplate:function(){return"login/loginTemplate.html"}}}).when("/sign-up",{controller:"voiceBasketBaseController",templateUrl:"/voiceBasket/base.html",title:"Sign Up",resolve:{currentSectionTemplate:function(){return"signUp/signUpTemplate.html"}}}).when("/dashboard",{controller:"voiceBasketBaseController",templateUrl:"/voiceBasket/base.html",title:"Dashboard",resolve:{currentSectionTemplate:function(){return"dashboard/dashboardTemplate.html"}}}),t.html5Mode({enabled:!0})}]),app.controller("voiceBasketBaseController",["$scope","$mdToast","$mdDialog","currentSectionTemplate","$location","currentUser",function(e,t,n,o,r,i){e.showToast=function(e,n,o){n=n||"center-large-content",o=o||3e3,t.show(t.simple().textContent(e).position(n).hideDelay(o))},e.showDialog=function(e,t){n.show(n.alert().clickOutsideToClose(!0).title(e).htmlContent(t).ariaLabel(e).ok("Okay"))},e.goTo=function(e){r.path(e)},e.currentTemplate="/voiceBasket/".concat(o),e.isLoggedIn=i.isLoggedIn()}]),function(){function e(e,t){function n(e){return console.log("Range called!"),console.log(_.range(parseInt(e))),_.range(parseInt(e))}function o(){e.showToast("Your request has been recieved!")}e.request={characters:[]},e.selectedAudios=t.getArtistRequestPayload(),e.types=["Commercial","Infomercials & Explainer Videos","Corporate Videos & Presentations","Cartoon / Animation Videos","Documentaries","Audio-books","IVR"],e.range=n,e.submit=o,e.charactersCount=0}app.controller("artistRequestController",["$scope","artistService",e])}(),function(){function e(e,t,n,o,r){function i(){t.getFilters().then(function(t){t.status&&(e.filters=t.result,e.filtersArray=function(){var t=[];return angular.forEach(e.filters,function(e,n){t.push({key:n,val:e})}),t}())})}function a(e,t){var n=r(e)(t);return n.replace(n.charAt(0),n.charAt(0).toLowerCase())}function s(){t.getArtistList().then(function(e){e.status&&(u=e.result.artistAudio)})}function l(t){return"language"!==t&&void 0===e.selectedFilter[d[t]]}function c(){0===Object.keys(e.selectedAudios).length?e.showToast("Please select at-least 1 sample","top"):Object.keys(e.selectedAudios).length>3?e.showToast("Can't select more than 3 samples","top"):(t.selectedAudios=e.selectedAudios,t.audios=e.audios,e.isLoggedIn?o.path("/raq"):(n.setNextStep("/raq"),o.path("/login")))}e.filters=null,e.audios=[],e.selectedFilter={},e.selectedAudios={},e.goToRAQ=c,e.renderOptionName=a,e.isDisabled=l;var u;i(),s(),e.$watch("selectedFilter",function(t){u&&(e.audios=[],e.selectedAudios={},u.forEach(function(n){_.isMatch(n.audioClip,t)&&e.audios.push(n)}))},!0);var d={gender:"language",voiceOverType:"gender",ageRange:"voiceOverType"}}app.controller("artistSearchController",["$scope","artistService","session","$location","$filter",e])}(),app.filter("searchFor",function(){return function(e,t){if(!t)return e;var n=[];return t=t.toLowerCase(),angular.forEach(e,function(e){-1!==e.title.toLowerCase().indexOf(t)&&n.push(e)}),n}}),app.filter("camelCaseToSpace",function(){return function(e){return e.replace(/([A-Z])/g,function(e){return"_"+e.toLowerCase()}).split("_").join(" ")}}),app.filter("removeDoubleUnderscores",function(){return function(e){return e.split("_").slice(1).join("_")}}),app.filter("toArray",function(){return function(e){return e instanceof Object?_.map(e,function(e,t){return Object.defineProperty(e,"$key",{__proto__:null,value:t})}):e}}),function(){function e(e,t){function n(){t.getDashboardData().then(function(t){t.status?e.dashboardData=t.result:e.showToast(t.message,"top")},function(t){console.log(t),e.showToast("Please try again","top")})}e.dashboardData=null,e.isLoggedIn&&n()}app.controller("dashboardController",["$scope","accountService",e])}(),function(){function e(e,t){e.menu=[{name:"Home",link:"/"},{name:"Voices",link:"/search"}],e.isLoggedIn?(console.log(t.user()),e.menu.push({name:t.user().user.name,link:"/dashboard"}),console.log(e.menu)):(e.menu.push({name:"Login",link:"/login"}),e.menu.push({name:"Sign Up",link:"/sign-up"}))}app.controller("headerController",["$scope","currentUser",e])}(),function(){function e(e,t,n,o,r){function i(){t.login(e.user).then(function(t){if(t.status){e.showToast("Login Successful","top"),n.setUser(t.result),n.setToken(t.result.sessionId);var i=void 0===r.getNextStep()?"/dashboard":r.getNextStep();r.purgeList(["next.step"]),o.path(i)}else e.showToast(t.message,"top")},function(t){console.log(t),e.showToast("Please try again","top")})}e.user={},e.login=i}app.controller("loginController",["$scope","accountService","currentUser","$location","session",e])}(),function(){function e(e,t,n,o,r){function i(){t.register(e.user).then(function(t){if(t.status){e.showToast("Sign Up successful","top"),o.setUser(t.result),o.setToken(t.result.sessionId);var i=void 0===r.getNextStep()?"/dashboard":r.getNextStep();r.purgeList(["next.step"]),n.path(i)}else e.showToast(t.message,"top")},function(t){console.log(t),e.showToast("Please try again","top")})}e.user={},e.signUp=i}app.controller("signUpController",["$scope","accountService","$location","currentUser","session",e])}();