/* By HoPollo, v1.5 */
let onCooldown = false;

window.addEventListener('onEventReceived', function(obj) {
    const listener = obj.detail.listener;
    const data = obj.detail.event;
  	const messageData = data.data.text;
  	const userType = data.data.tags.badges;
  
  	let currentVotes = 0;
  
  	let sloopsCounter = parseInt($('.sloopsCounter').text());
    let brigsCounter  = parseInt($('.brigsCounter').text());
    let galysCounter  = parseInt($('.galysCounter').text());
  
    if (listener === 'message') {
      	// deny vote from randoms, but allow for anyone else
      	switch(userType) {
          case "":
            return;
            break;
        }
      
        switch(messageData) {
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
            refreshCounters()
            break;
          case '{{sloopsCommand}}-':
            removeSloop()
            break;
          case '{{brigsCommand}}-':
            removeBrig()
            break;
          case '{{galysCommand}}-':
            removeGalion()
            break;
        }
    }
  
  	function addSloop() {
      if (onCooldown) { return; }
      sloopsCounter = sloopsCounter + 1;
      $('.sloopsCounter').text(sloopsCounter);
      waitCooldown();
    }

    function addBrig() {
      if (onCooldown) { return; }
      brigsCounter = brigsCounter + 1;
      $('.brigsCounter').text(brigsCounter);
      waitCooldown();
    }

    function addGalion() {
      if (onCooldown) { return; }
      galysCounter = galysCounter + 1;
      $('.galysCounter').text(galysCounter);
      waitCooldown();
    }
  
  	function removeSloop() {
      if (sloopsCounter < 1 && userType !='broadcaster' || sloopsCounter < 1 && userType != 'moderator') { return; }
      	sloopsCounter = sloopsCounter - 1;
  		$('.sloopsCounter').text(sloopsCounter);
    }
  
  	function removeBrig() {
      if (brigsCounter < 1 && userType !='broadcaster' || brigsCounter < 1 && userType != 'moderator') { return; }
      	brigsCounter = brigsCounter - 1;
  		$('.brigsCounter').text(brigsCounter);
    }
  
  	function removeGalion() {
      if (galysCounter < 1 && userType !='broadcaster' || galysCounter < 1 && userType != 'moderator') { return; }
      	galysCounter = galysCounter - 1;
  		$('.galysCounter').text(galysCounter);
    }
  
  	function refreshCounters() {
      if (userType != 'broadcaster') { return; }
      $('.sloopsCounter').text(0);
      $('.brigsCounter').text(0);
      $('.galysCounter').text(0);
    }
});

window.addEventListener('onWidgetLoad', function(obj) {
  const url = `https://decapi.me/twitch/game/${obj.detail.channel.username}`;
  fetch(url)
    .then(res => res.text())
    .then(data => {
  		if (data != 'Sea of Thieves') { return; }
    	$('.main-container').css('display','flex');
  	})
});

function waitCooldown() {
 	onCooldown = true;
  	setTimeout(() => {
        onCooldown = false;
    }, {{cooldownValue}}*1000*60);
}
