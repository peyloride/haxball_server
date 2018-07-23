var room = HBInit({
  playerName: "root", 
  roomName: "Peyloride | v3 | +24 | VPS | 7x24 açık", 
  maxPlayers: 8, 
  public: true, 
  geo : {"code": "tr", "lat" : 41.7351, "lon" : 27.2252}
});

var total_players = 0;

// If there are no admins left in the room give admin to one of the remaining players.
function updateAdmins() { 
  // Get all players except the host (id = 0 is always the host)
  var players = room.getPlayerList().filter((player) => player.id != 0 );
  if ( players.length == 0 ) return; // No players left, do nothing.
  if ( players.find((player) => player.admin) != null ) return; // There's an admin left so do nothing.
  room.setPlayerAdmin(players[0].id, true); // Give admin to the first non admin player in the list
}

room.onPlayerJoin = function(player) {
  if (player.name === "Peyloride" || player.name === "Aylak") {
    var players = room.getPlayerList().filter((player) => player.id != 0 );
    current_admin = players.find((player) => player.admin)
    room.setPlayerAdmin(current_admin.id, false);
    room.setPlayerAdmin(player.id, true);
  }
  total_players = total_players + 1;
  updateAdmins();
}

room.onPlayerLeave = function(player) {
  updateAdmins();
}
