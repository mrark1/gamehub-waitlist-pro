export const createPlayer = (data) => ({
  id: data.id,

  playerName: data.playerName,

  email: data.email,

  phone: data.phone,

  game: data.game,

  platform: data.platform,

  priority: data.priority,

  status: data.status,

  estimatedWait: data.estimatedWait,

  notes: data.notes,

  createdAt: data.createdAt,

  updatedAt: data.updatedAt,
});