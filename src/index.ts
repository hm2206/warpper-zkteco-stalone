/* eslint-disable quotes */
import path from "path";
import { AssistanceService } from "./service/assistance.service";
import { UserService } from "./service/user.service";

export class Zkteco {
  private clock = path.resolve(__dirname, "../clock.exe");
  public assistance: AssistanceService;
  public user: UserService;

  constructor(private ip: string) {
    this.user = new UserService(this.clock, this.ip);
    this.assistance = new AssistanceService(this.clock, this.ip);
  }
}