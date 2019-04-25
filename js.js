/* By HoPollo, v1.2 */

window.addEventListener('onEventReceived', function(obj) {
    const listener = obj.detail.listener;
    const data = obj.detail.event;
  	const messageData = data.data.text;
  	const userType = data.data.badges[0].type;
  	const votesRequiered = '{{v}}';

  	let sloopsCounter = parseInt($('.sloopsCounter').text());
    let brigsCounter  = parseInt($('.brigsCounter').text());
    let galysCounter  = parseInt($('.galysCounter').text());
  
    if (listener === 'message') {
      	if (userType != 'broadcaster' && userType != 'moderator' && userType != 'vip') { return; }
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
      sloopsCounter = sloopsCounter + 1;
      $('.sloopsCounter').text(sloopsCounter);
    }

    function addBrig() {
      brigsCounter = brigsCounter + 1;
      $('.brigsCounter').text(brigsCounter);
    }

    function addGalion() {
      galysCounter = galysCounter + 1;
      $('.galysCounter').text(galysCounter);
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
  const url = `https://decapi.me/twitch/game/hopollo`;
  fetch(url)
    .then(res => res.text())
    .then(data => {
  		if (data != 'Sea of Thieves') { return; }
    	$('.main-container').css('display','flex');
  	})
});
