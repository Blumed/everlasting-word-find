function removeAds() {
    chrome
        .tabs
        .executeScript({ file: 'assets/js/removeAds.js' });
}

var app = {
  init: function () {
      var storage = chrome.storage.local,
          adCheckbox = document.getElementById('removeAds');
    //Cache elements
    // var submitClicked = document.getElementById('submitBtn'),
    // 	stylesTextArea = document.getElementById('stylesTextArea'),
    // 	noStyles = '';


    //Adding Selectors
    // chrome.runtime.sendMessage({
    //   fn: "getSelector"
    // }, function (response) {
    //   console.log('getSelector message was sent');
    //   //console.log("got selector" + response.selector);
    //   // function changeHandler() {
    //   //     //Do Something...maybe another function showAlert(), for instance
    //   //     if (removeAds.checked) {
    //   //         //do something
    //   //         chrome.runtime.sendMessage({ fn: "getSelections", style: console.log('checked yo') });
    //   //     } else {
    //   //         //do something else
    //   //         chrome.runtime.sendMessage({ fn: "getSelections", style: console.log('not checked yo') });
    //   //     }
    //   // }
    // });


    //Sends border or shader style to page
    // submitClicked.addEventListener('click', function() {
    // 	let currentStyle = stylesTextArea.value;

    //     chrome.runtime.sendMessage({ fn: "setSelections", style: currentStyle});
    //     //Runs contentscript so background respnonse will activate selectors on current page
    //     	contentScript();
    // });

    // document.addEventListener('DOMContentLoaded', function () {
    //   document.querySelector('#removeAds').addEventListener('change', changeHandler);
    // });
     
      //Retrieve existing settings
      $('*:checkbox').each(function (index, element) {
          var name = this.name;
          storage.get(name, function (items) {
              element.checked = items[name]; // true  OR  false / undefined (=false)
          });
      });

      $('*:checkbox').on('change', saveSettings);

      //Save or delete settings
      function saveSettings() {
          var name = this.name;
          var items = {};
          items[name] = this.checked;
          storage.set(items, function () {
              // console.log("saved");
          });

      }

      // check hover toggle
      this.removeAdChecked = adCheckbox.checked;

      // hover toggle event listener
      adCheckbox.addEventListener('change', function () {
          // store checked state
          removeAdChecked = this.checked;

          //set hover state in chrome local storage
          chrome
              .storage
              .local
              .set({ removeAdChecked: removeAdChecked });

          // send hover state


          // fire outliner
          //hoverItUp();
      });
    // function changeHandler() {
    //   //Do Something...maybe another function showAlert(), for instance
    //   if (removeAds.checked) {
    //     //do something
    //     chrome.runtime.sendMessage({
    //       fn: "setSelections",
    //       style: console.log('checked yo')
    //     });
    //   } else {
    //     //do something else
    //     chrome.runtime.sendMessage({
    //       fn: "setSelections",
    //       style: console.log('not checked yo')
    //     });
    //   }
    // }

  }
}

app.init();
