//console.log('before result', localStorage["total_elements"]);
let results = localStorage["total_elements"].split(',');
let shuffled = results.sort(function(){return .5 - Math.random()});
let selected = (total) => shuffled.slice(0,total);
// console.log('result', selected(15));
    /* Example words setup */
    selected(15).map(word => window.WordFindGame.insertWordBefore($('#add-word').parent(), word));
  
      /* Init */
      function recreate() {
        $('#result-message').removeClass();
        let game;
        try {
          game = new WordFindGame('#puzzle', {
            allowedMissingWords: 0,
            maxGridGrowth: +$('#max-grid-growth').val(),
            fillBlanks: true,
            maxAttempts: 100,
          });
        } catch (error) {
          $('#result-message').text(`Sad Face ${error}, try to specify less ones`).css({ color: 'red' });
          return;
        }
        wordfind.print(game);
        if (window.game) {
          var emptySquaresCount = WordFindGame.emptySquaresCount();
          $('#result-message').text(`Happy Face ${emptySquaresCount ? 'but there are empty squares' : ''}`).css({ color: '' });
        }
        window.game = game;
      }
      recreate();
  
    function reloadMainTab() {
        window.close();
        chrome.tabs.reload();
    }
    document.getElementById('refresh').addEventListener('click', reloadMainTab);
      $('#create-grid').click(recreate);
      $('#print').click(() => window.print());
      $('#solve').click(() => game.solve());
      window.parent.postMessage({ type: "hideFrame" }, "*");