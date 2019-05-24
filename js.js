/* By HoPollo */
let channelName = "";
let onCooldown = false;
let currentVotes = 0;
let currentWins = [];
let currentKills = [];
let dataSaved = false;

let counter = {
      SLOOP 	: parseInt($('.sloopsCounter').text()),
      BRIG  	: parseInt($('.brigsCounter').text()),
      GALION  	: parseInt($('.galysCounter').text()),
      WINS 		: parseInt($('.winsCounter').text()),
      KILLS 	: parseInt($('.killsCounter').text())
}

window.addEventListener('onEventReceived', (obj) => {
    const event = {
      LISTENER 	: obj.detail.listener,
      DATA 		: obj.detail.event,
      MESSAGE 	: obj.detail.event.data.text,
      USERTYPE 	: obj.detail.event.data.tags.badges
    }
  
    if (event.LISTENER === 'message') {
      	if (event.USERTYPE == "") return;
      
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
          case '!killsshow':
            if (event.USERTYPE === 'broadcaster/1') showKillsCounters();
            break;
          case '!killshide':
            if (event.USERTYPE === 'broadcaster/1') hideKillsCounters();
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
      $('.winsCounter').text(0);
    }
});

window.addEventListener('onWidgetLoad', function(obj) {
  	channelName = obj.detail.channel.username;
    fetchCurrentGame(channelName);
});

function fetchCurrentGame(channelName) {
  fetch(`https://decapi.me/twitch/game/${channelName}`)
      .then(res => res.text())
      .then(data => {
          switch(data) {
            case 'Sea of Thieves':
              showSOTCounters();
              break;
            case 'Fortnite':
              showWinsCounters();
              break;
            case "PLAYERUNKNOWN'S BATTLEGROUNDS":
              showKillsCounters();
          }
      })
  	  .catch(err => console.error(err))
}

function hideSOTCounters()   { $('.sotCounters').css('display','none'); }
function showSOTCounters()   { $('.sotCounters').css('display','block'); }
function hideWinsCounters()  { $('.dailyVictoryCounters').css('display','none'); }
function showWinsCounters()  { 
  $('.dailyVictoryCounters').css('display', 'block');
  fetchFortniteData();
}
function hideKillsCounters() { $('.dailyKillsCounters').css('display','none'); }
function showKillsCounters() {
  $('.dailyKillsCounters').css('display', 'block');
  fetchPubgData();
}

function fetchFortniteData() {
  const options = {
      headers: {
        'TRN-Api-Key': '4bcb30a8-61f3-4dfd-b892-6739ce8e2694',
        'Content-Type': 'application/json'
      }
  };

  fetch(`https://cors-anywhere.herokuapp.com/https://api.fortnitetracker.com/v1/profile/pc/{{epicGameName}}`, options)
    .then(res => res.json())
    .then(data => {
    	Object.keys(data.stats).forEach((_) => {
      		if (_.includes('curr_')) {
              if (!dataSaved) {
                currentWins[0] = data.stats[_].top1.value;
                dataSaved = true;
              }
              currentWins[1] = data.stats[_].top1.value;
              counter.WINS = currentWins[1] - currentWins[0];
          	  $('.winsCounter').text(counter.WINS);
            }
   	 	})
  	})
    .catch(err => console.log(err)) 
}

function fetchPubgData() {
 const options = {
    headers: {
      "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJiMjI1Yjk1MC01NjdiLTAxMzctOGJmZC0wYzUxY2E4YzhkMGEiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTU3NjIxMjk4LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6ImhvcG9sbG90di1nbWFpIn0.Qyfl1mYA0liTm7dVLFmIoHK-a-xukjnyMR7NZZA-Lzk",
      "Accept": "application/vnd.api+json"
    }
  }

  fetch("https://api.pubg.com/shards/steam/seasons", options)
    .then(res => res.json())
    .then(data => {
      const seasonID = data.data[data.data.length-1].id;
      fetch(`https://api.pubg.com/shards/steam/players?filter[playerNames]={{pubgName}}`, options)
        .then(res => res.json())
        .then(data => { 
          const accountID = data.data[0].id;
          fetch(`https://api.pubg.com/shards/steam/players/${accountID}/seasons/${seasonID}`, options)
            .then(res => res.json())
            .then(data => {
              const info = data.data.attributes.gameModeStats;
              const solo = info.solo.dailyKills;
              const duo = info.duo.dailyKills;
              const squad = info.squad.dailyKills;
              const soloFpp = info["solo-fpp"].dailyKills;
              const duoFpp = info["duo-fpp"].dailyKills;
              const squadFpp = info["squad-fpp"].dailyKills;
				
              if (!dataSaved) {
                currentKills[0] = solo + duo + squad + soloFpp + duoFpp + squadFpp;
                dataSaved = true;
              }
              currentKills[1] = solo + duo + squad + soloFpp + duoFpp + squadFpp;
              counter.KILLS = currentKills[1] - currentKills[0];
              $('.killsCounter').text(counter.KILLS);
            })
          	.catch(err => console.log(err))
    	})
      	.catch(err => console.error(err))
  	})
    .catch(err => console.error(err)) 
}

function waitCooldown() {
 	onCooldown = true;
  	setTimeout(() => {
    	onCooldown = false;
    }, {{cooldownValue}}*60*1000);
}

setInterval(() => {
  	fetchCurrentGame(channelName);
}, 60000);
