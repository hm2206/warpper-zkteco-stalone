import { UserEntity } from "interfaces/user.entity";
import * as path from "path";
import { execSync } from "child_process";

export class ZktecoService {
  constructor(private ip: string) {}

  private clock = path.resolve(__dirname, "../clock.exe");

  public async getUsers(): Promise<{ total: number; usuarios: UserEntity[] }> {
    const command = "usersearchall";
    return new Promise((resolve, reject) => {
      try {
        const execute = execSync(`${this.clock} "${this.ip}" "${command}"`);
        const resultJSON = JSON.parse(execute.toString("utf-8"));
        resolve(resultJSON);
      } catch (error) {
        reject(error);
      }
    });
  }
}
