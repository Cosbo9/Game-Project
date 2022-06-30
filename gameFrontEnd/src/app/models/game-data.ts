export class GameData {
  createdAt: Date;
  updatedAt: Date;
  moves: string;
  hostingUserId: number;
  joiningUserId: number;
  status: string;

  constructor(gameJson: any) {
    this.createdAt = new Date(gameJson.created_at);
    this.updatedAt = new Date(gameJson.updated_at);
    this.moves = gameJson.moves;
    this.hostingUserId = gameJson.hosting_user_id;
    this.joiningUserId = gameJson.joining_user_id;
    this.status = gameJson.status;
  }
}
