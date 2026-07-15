import { saveAs } from "file-saver";

export function exportPlayers(players) {
  if (!players.length) return;

  const headers = [
    "Name",
    "Email",
    "Phone",
    "Game",
    "Platform",
    "Priority",
    "Status",
    "Estimated Wait",
  ];

  const rows = players.map((player) => [
    player.playerName,
    player.email,
    player.phone,
    player.game,
    player.platform,
    player.priority,
    player.status,
    player.estimatedWait,
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  saveAs(blob, "players.csv");
}