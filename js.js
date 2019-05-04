/* By HoPollo */
let onCooldown = false;
let currentVotes = 0;

window.addEventListener('onEventReceived', (obj) => {
    const event = {
      LISTENER 	: obj.detail.listener,
      DATA 		: obj.detail.event,
      MESSAGE 	: obj.detail.event.data.text,
      USERTYPE 	: obj.detail.event.data.tags.badges
    }
    
    let counter = {
      SLOOP 	: parseInt($('.sloopsCounter').text()),
      BRIG  	: parseInt($('.brigsCounter').text()),
      GALION  	: parseInt($('.galysCounter').text()),
      WINS 		: parseInt($('.winsCounter').text())
    }
  
    if (event.LISTENER === 'message') {
      	switch(event.USERTYPE) {
          case "":
            return;
            break;
        }
      
        switch(event.MESSAGE) {
          case '{{winsCommand}}':
            addWin();
            break;
          case '{{sloopsCommand}}':
            addSloop();
            break;
          case '{{brigsCommand}}':
            addBrig();
            break;
          case '{{galysCommand}}':
            addGalion();
            break;
          case '{{SOTRefreshCommand}}':
          case '{{WinsRefreshCommand}}':
            refreshCounters();
            break;
          case '{{winsCommand}}-':
            removeWin();
            break;
          case '{{sloopsCommand}}-':
            removeSloop();
            break;
          case '{{brigsCommand}}-':
            removeBrig();
            break;
          case '{{galysCommand}}-':
            removeGalion();
            break;
          case '!sotshow':
            if (event.USERTYPE === 'broadcaster/1') showSOTCounters();
            break;
          case '!sothide':
            if (event.USERTYPE === 'broadcaster/1') hideSOTCounters();
            break;
          case '!winsshow':
            if (event.USERTYPE === 'broadcaster/1') showWinsCounters();
            break;
          case '!winshide':
            if (event.USERTYPE === 'broadcaster/1') hideWinsCounters();
            break;
        }
    }
  
  	function addWin() {
      if (onCooldown) return;
      counter.WINS = counter.WINS + 1;
      $('.winsCounter').text(counter.WINS);
      waitCooldown();
    }
  
  	function addSloop() {
      if (onCooldown) return;
      counter.SLOOP = counter.SLOOP + 1;
      $('.sloopsCounter').text(counter.SLOOP);
      waitCooldown();
    }

    function addBrig() {
      if (onCooldown) return;
      counter.BRIG = counter.BRIG + 1;
      $('.brigsCounter').text(counter.BRIG);
      waitCooldown();
    }

    function addGalion() {
      if (onCooldown) return;
      counter.GALION = counter.GALION + 1;
      $('.galysCounter').text(counter.GALION);
      waitCooldown();
    }
  
  	function removeSloop() {
      if (counter.SLOOP === 0 && event.USERTYPE !='broadcaster/1' || counter.SLOOP === 0 && event.USERTYPE != 'moderator/1') return;
      counter.SLOOP = counter.SLOOP - 1;
      $('.sloopsCounter').text(counter.SLOOP);
    }
  
  	function removeBrig() {
      if (counter.BRIG === 0 && event.USERTYPE !='broadcaster/1' || counter.BRIG === 0 && event.USERTYPE != 'moderator/1') return;
      counter.BRIG = counter.BRIG - 1;
      $('.brigsCounter').text(counter.BRIG);
    }
  
  	function removeGalion() {
      if (counter.GALION === 0 && event.USERTYPE !='broadcaster/1' || counter.GALION === 0 && event.USERTYPE != 'moderator/1') return;
      counter.GALION = counter.GALION - 1;
      $('.galysCounter').text(counter.GALION);
    }
  
  	function removeWin() {
      if (counter.WINS === 0 && event.USERTYPE !='broadcaster/1' || counter.WINS === 0 && event.USERTYPE != 'moderator/1') return;
      counter.WINS = counter.WINS - 1;
      $('.winsCounter').text(counter.WINS);
    }
  
  	function refreshCounters() {
      if (event.USERTYPE != 'broadcaster/1') return;
      $('.sloopsCounter').text(0);
      $('.brigsCounter').text(0);
      $('.galysCounter').text(0);
      $('.victoryCounter').text(0);
    }
});

window.addEventListener('onWidgetLoad', function(obj) {
  	const url = `https://decapi.me/twitch/game/${obj.detail.channel.username}`;
    fetch(url)
      .then(res => res.text())
      .then(data => {
          switch(data) {
            case 'Sea of Thieves':
              $('.main-container').css('display', 'flex');
              showSOTCounters();
              break;
            case 'Fortnite':
              $('.main-container').css('display', 'flex');
              showWinsCounters();
              break;
            default:
              $('.main-container').css('display', 'none');
          }
      })
  	  .catch(err => console.error(err))
});

function hideSOTCounters()  { $('.sotCounters').css('display','none'); 	  }
function showSOTCounters()  { $('.main-container').css('display', 'flex'); $('.sotCounters').css('display','block'); 	  }
function hideWinsCounters() { $('.victoryCounters').css('display','none'); }
function showWinsCounters() { $('.main-container').css('display', 'flex'); $('.victoryCounters').css('display','block'); }

function waitCooldown() {
 	onCooldown = true;
  	setTimeout(() => {
    	onCooldown = false;
    }, 5000);
    //}, {{cooldownValue}}*1000*60);
}
