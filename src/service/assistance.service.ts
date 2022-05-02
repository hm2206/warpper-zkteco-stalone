import { exec, execSync } from "child_process";
import { IAssistanceEntity } from "interfaces/assistance.entity";

export class AssistanceService {
  constructor(private clock: string, private ip: string) {}

  public async getAssistances(): Promise<{
    total: number;
    assistencias: IAssistanceEntity[];
  }> {
    const command = "getrecordsattendances";
    return new Promise((resolve, reject) => {
      try {
        const execute = execSync(`${this.clock} "${this.ip}" "${command}"`);
        const resultJSON: any = JSON.parse(execute.toString("utf-8"));
        resultJSON.assistencias = resultJSON.assistencias
          ? resultJSON.assistencias
          : [];
        resolve(resultJSON);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async deleteAssistances(): Promise<boolean> {
    const command = "deleterecordsattendances";
    return new Promise((resolve, reject) => {
      try {
        exec(`${this.clock} "${this.ip}" "${command}"`, (err) => {
          if (err) throw err;
        });
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }
}
