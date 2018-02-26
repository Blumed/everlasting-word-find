'use strict';

// chrome.runtime.sendMessage({ fn: "getSelector" } , function(response) {
// 	//console.log(response.selector, response.style);
//     $('head').append($('<style type="text/css">' + response.style + '</style>'));

// });

      // function saveChanges() {
      //   // Get a value saved in a form.
      //   var theValue = textarea.value;
      //   // Check that there's some code there.
      //   if (!theValue) {
      //     message('Error: No value specified');
      //     return;
      //   }
      //   // Save it using the Chrome extension storage API.
      //   chrome.storage.sync.set({'value': theValue}, function() {
      //     // Notify that we saved.
      //     message('Settings saved');
      //   });
      // }

      //   chrome.storage.onChanged.addListener(function(changes, namespace) {
      //   for (key in changes) {
      //     var storageChange = changes[key];
      //     console.log('Storage key "%s" in namespace "%s" changed. ' +
      //                 'Old value was "%s", new value is "%s".',
      //                 key,
      //                 namespace,
      //                 storageChange.oldValue,
      //                 storageChange.newValue);
      //   }
      // });
// var customStyles = document.createElement('style'); 
// customStyles.appendChild(document.createTextNode(
//    'body { background-color: ' + localStorage.getItem('background-color') + '}'
// ));
// document.documentElement.insertBefore(customStyles); 
// function injectStyles(file, node) {
//   var th = document.body;
//   var s = document.createElement('link');
//   s.rel = 'stylesheet'
//   s.setAttribute('href', file);
//   th.appendChild(s);
// }
// injectStyles(chrome.extension.getURL('assets/css/style.css'), 'body');
