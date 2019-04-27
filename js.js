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
      GALION  	: parseInt($('.galysCounter').text())
    }
  
    if (event.LISTENER === 'message') {
      	switch(event.USERTYPE) {
          case "":
            return;
            break;
        }
      
        switch(event.MESSAGE) {
          case '{{sloopsCommand}}':
            addSloop();
            break;
          case '{{brigsCommand}}':
            addBrig();
            break;
          case '{{galysCommand}}':
            addGalion();
            break;
          case '{{refreshCommand}}':
            refreshCounters();
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
        }
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
  
  	function refreshCounters() {
      if (event.USERTYPE != 'broadcaster/1') return;
      $('.sloopsCounter').text(0);
      $('.brigsCounter').text(0);
      $('.galysCounter').text(0);
    }
});

window.addEventListener('onWidgetLoad', function(obj) {
  checkStatus()
  
  function checkStatus() {
  	const url = `https://decapi.me/twitch/game/${obj.detail.channel.username}`
    fetch(url)
      .then(res => res.text())
      .then(data => {
          if (data != 'Sea of Thieves') { return }
          $('.main-container').css('display','flex')
      })
  }
  
  setInterval(() => {
    checkStatus()
  }, 5*1000*60)
});

function waitCooldown() {
 	onCooldown = true;
  	setTimeout(() => {
        onCooldown = false;
    }, 5000);
    //}, {{cooldownValue}}*1000*60);
}
