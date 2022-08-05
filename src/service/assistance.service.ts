/* eslint-disable no-async-promise-executor */
/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable quotes */
import { exec } from "child_process";
import { IAssistanceEntity } from "../interfaces/assistance.entity";

export class AssistanceService {
  constructor(private clock: string, private ip: string) {}

  public async getAssistances(): Promise<{
    total: number;
    assistencias: IAssistanceEntity[];
  }> {
    const command = "getrecordsattendances";
    return new Promise(async (resolve, reject) => {
      try {
        exec(
          `${this.clock} "${this.ip}" "${command}"`,
          (error, stdout, stderr) => {
            if (error) return reject(error);

            if (stderr) {
              return reject(new Error(stderr));
            }

            try {
              const resultJSON: any = JSON.parse(stdout || "{}");
              resultJSON.assistencias = resultJSON.assistencias
                ? resultJSON.assistencias
                : [];
              return resolve(resultJSON);
            } catch (err) {
              return reject(err);
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  public async deleteAssistances(): Promise<boolean> {
    const command = "deleterecordsattendances";
    return new Promise((resolve, reject) => {
      try {
        exec(
          `${this.clock} "${this.ip}" "${command}"`,
          (error, stdout, stderr) => {
            if (error) return reject(error);

            if (stderr) {
              return reject(new Error(stderr));
            }

            resolve(true);
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }
}
