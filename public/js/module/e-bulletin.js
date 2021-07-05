var ebulletin = (function () {
'use strict';
var initModule = function ( $container ) {
//e-bulletin.model.initModule();
ebulletin.shell.initModule( $container );
};
return { initModule: initModule };
}());