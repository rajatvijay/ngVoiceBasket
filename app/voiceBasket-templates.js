angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("/voiceBasket/base.html","<div id=loading-bar-spinner><div class=bar><div class=peg></div></div></div><div layout=column><ng-include src=\"\'/voiceBasket/header/headerTemplate.html\'\"></ng-include><md-content><ng-include src=currentTemplate></ng-include></md-content></div>");
$templateCache.put("/voiceBasket/artistRequest/artistRequestTemplate.html","<div ng-controller=artistRequestController layout=column layout-align=\"center center\" class=vb-raq><h1>Request A Quote</h1><form name=requestForm ng-submit=submit() layout=column><md-input-container><label for=type>Type</label><md-select id=type ng-model=request.request.type><md-option ng-repeat=\"type in types\" ng-value=type>{{ type }}</md-option></md-select></md-input-container><div layout=row layout-align=\"space-between center\"><md-input-container layout=row layout-align=\"space-between center\"><p><strong>Language</strong></p><p ng-bind=selectedAudios[0].audioClip.language></p></md-input-container><md-input-container layout=row><p><strong>Voice Over Type</strong></p><p ng-bind=selectedAudios[0].audioClip.voiceOverType></p></md-input-container></div><md-input-container layout=column layout-align=\"space-between center\"><div ng-repeat=\"audio in selectedAudios\" layout=row layout-align=\"space-between center\"><p><strong>Artist Code</strong></p><p ng-bind=audio.audioClip.code></p></div></md-input-container><md-input-container ng-if=\"request.request.type === \'Audio-books\'\"><label for=bookName>Name of the book</label> <input id=bookName type=text ng-model=request.request.bookName></md-input-container><div layout=column ng-if=\"request.request.type === \'Commercial\'\"><md-input-container><label for=chars>No of Characters</label> <input id=chars type=number ng-model=charactersCount></md-input-container><div ng-show=\"charactersCount !== 0\" layout=column><p>Artist Allocation</p><md-input-container ng-repeat=\"num in range(charactersCount)\"><label for=charsAlloc>Character {{ num + 1 }}</label><md-select id=charsAlloc ng-model=request.characters[num]><md-option ng-repeat=\"audio in selectedAudios\" ng-value=audio>{{ audio.artist.name }}</md-option></md-select></md-input-container></div></div><md-input-container ng-if=\"request.request.type === \'IVR\'\"><label for=messagesCount>No of Messages</label> <input id=messagesCount type=number ng-model=request.request.messagesCount></md-input-container><md-input-container><label for=duration>Duration (mins)</label> <input id=duration type=number ng-model=request.request.durationInMinutes></md-input-container><md-input-container><label for=wordCount>No of Words</label> <input id=wordCount type=number ng-model=request.request.wordCount></md-input-container><md-input-container ng-if=\"request.request.type === \'Commercial\'\"><label for=broadcast>Broadcast Type</label><md-select id=broadcast ng-model=request.request.broadcastType><md-option ng-repeat=\"type in [\'TV\', \'Radio\']\" ng-value=type>{{ type }}</md-option></md-select></md-input-container><md-input-container><label for=scriptText>Copy/Paste Script</label> <textarea id=scriptText ng-model=request.request.scriptText></textarea></md-input-container><md-input-container><label for=scriptUrl>Upload Script Url</label> <input type=url id=scriptUrl ng-model=request.request.scriptUrl></md-input-container><md-input-container><label for=notes>ADD NOTES FOR ARTIST (DIRECTION, TIMINGS, PRONUNCIATION, VIDEO LINKS etc.)</label> <textarea id=notes ng-model=request.request.additional_notes></textarea></md-input-container><md-input-container layout=row><md-button ng-click=submit() flex=100>Request</md-button></md-input-container></form></div>");
$templateCache.put("/voiceBasket/artistSearch/artistSearchTemplate.html","<div ng-controller=artistSearchController layout=column class=vb-search><h1>Search An Artist</h1><div layout=row layout-align=\"center center\" layout-padding layout-margin class=vb-search-bar><md-input-container ng-repeat=\"prop in filtersArray | orderBy: \'key\'\"><label for=filter style=\"color: #000;\">{{ prop.key | removeDoubleUnderscores | camelCaseToSpace | uppercase }}</label><md-select id=filter ng-disabled=\"isDisabled(renderOptionName(\'removeDoubleUnderscores\', prop.key))\" ng-model=\"selectedFilter[renderOptionName(\'removeDoubleUnderscores\', prop.key)]\"><md-option ng-value=filter ng-repeat=\"filter in prop.val\">{{ filter }}</md-option></md-select></md-input-container></div><div layout=column layout-align=\"center center\" class=vb-search-result><md-checkbox ng-repeat=\"audio in audios\" ng-model=selectedAudios[audio.id]><div layout=column><audio controls><source src=https://www.w3schools.com/html/horse.mp3 type=audio/mpeg>Your browser does not support the audios.</audio><div layout=row layout-align=\"space-between center\"><p>{{ audio.artist.name }}</p><p>{{ audio.audioClip.voiceOverType }}</p></div></div></md-checkbox></div><div layout=row layout-align=\"center center\"><md-button ng-click=goToRAQ()>Request a Quote</md-button></div></div>");
$templateCache.put("/voiceBasket/dashboard/dashboardTemplate.html","<div ng-controller=dashboardController layout=column class=vb-dashboard><table><thead><tr><th>Request Type</th><th>Date</th><th>Accept</th><th>Reject</th><th ng-if=\"userType !== \'admin\'\">Status</th><th ng-if=\"userType === \'admin\'\">User Status</th><th ng-if=\"userType === \'admin\'\">Admin Status</th></tr></thead><tbody><tr ng-repeat=\"request in dashboardData\"><td>{{ request.type }}</td><td>{{ request.createdOn | date: \'shortDate\' }}</td><td><a href=# ng-class=\"request.userStatus === null ? \'\' : \'vb-disabled\'\" ng-click=\"updateStatus($event, request.id, \'accept\')\">Accept</a></td><td><a href=# ng-class=\"request.userStatus === null ? \'\' : \'vb-disabled\'\" ng-click=\"updateStatus($event, request.id, \'reject\')\">Decline</a></td><td>{{ request.userStatus | uppercase }}</td><td ng-if=\"userType === \'admin\'\">{{ request.adminStatus | uppercase }}</td></tr></tbody></table></div>");
$templateCache.put("/voiceBasket/header/headerTemplate.html","<div layout=row class=vb-header ng-controller=headerController><div flex=40 layout=column layout-align=center><img src=http://res.cloudinary.com/rajatvijay/image/upload/v1497291675/VB-LOGO-E_mo0fmt.png></div><div flex layout=row><ul layout-padding flex layout=row layout-align=end layout-margin><li ng-repeat=\"option in menu\"><a ng-href=\"{{ option.link }}\">{{ option.name }}</a></li></ul></div></div>");
$templateCache.put("/voiceBasket/home/homeTemplate.html","<div layout=column class=vb-home layout-align=\"end center\"><h1>Welcome to Voice Basket</h1><md-button ng-click=\"goTo(\'/search\')\">Book An Artist</md-button></div>");
$templateCache.put("/voiceBasket/login/loginTemplate.html","<div layout=column layout-align=\"center center\" ng-controller=loginController class=vb-login><h2>Login</h2><form name=loginForm layout=column ng-submit=login()><md-input-container><label for=email>Email</label> <input type=email id=email ng-model=user.email></md-input-container><md-input-container><label for=password>Password</label> <input type=password id=password ng-model=user.password></md-input-container><md-input-container layout=row layout-align=\"center center\"><md-button ng-click=login()>Login</md-button></md-input-container><div layout=column layout-align=\"center center\"><a href=/sign-up>Don\'t have an account?</a></div></form></div>");
$templateCache.put("/voiceBasket/signUp/signUpTemplate.html","<div layout=column layout-align=\"center center\" ng-controller=signUpController class=vb-signUp><h2>Sign Up</h2><form name=signUpForm layout=column ng-submit=signUp()><md-input-container><label for=name>Name</label> <input type=text id=name ng-model=user.name></md-input-container><md-input-container><label for=companyName>Company Name</label> <input type=text id=companyName ng-model=user.companyName></md-input-container><md-input-container><label for=mobile>Mobile</label> <input type=text id=mobile ng-model=user.mobile></md-input-container><md-input-container><label for=email>Email</label> <input type=email id=email ng-model=user.email></md-input-container><md-input-container><label for=password>Password</label> <input type=password id=password ng-model=user.password></md-input-container><md-input-container><md-radio-group ng-model=user.userType><md-radio-button value=user class=primary>Sign Up As A User</md-radio-button><md-radio-button value=artist>Sign Up As An Artist</md-radio-button></md-radio-group></md-input-container><md-input-container layout=row layout-align=\"center center\"><md-button ng-click=signUp()>Sign Up</md-button></md-input-container></form></div>");}]);