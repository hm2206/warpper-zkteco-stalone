/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import { UserEntity } from "../interfaces/user.entity";
import { exec } from "child_process";
import { IUserCreateDto } from "../interfaces/user-create.dto";

export class UserService {
  constructor(private clock: string, private ip: string) {}

  public async getUsers(): Promise<{ total: number; usuarios: UserEntity[] }> {
    const command = "usersearchall";
    return new Promise((resolve, reject) => {
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
              resultJSON.usuarios = resultJSON.usuarios
                ? resultJSON.usuarios
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

  public async setUser(payload: IUserCreateDto): Promise<boolean> {
    const command = "addUser";
    return new Promise((resolve, reject) => {
      try {
        const commandExecute = `${this.clock} "${this.ip}" "${command}" "${payload.numberCredential}" "${payload.Nombre}" "${payload.permiso}" "${payload.IndexHuella}" "${payload.b64Huella}"`;
        exec(commandExecute, (err) => {
          if (err) throw err;
        });
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async findUser(NumeroCredencial: number): Promise<UserEntity> {
    const command = "usersearch";
    return new Promise((resolve, reject) => {
      try {
        exec(
          `${this.clock} "${this.ip}" "${command}" "${NumeroCredencial}"`,
          (error, stdout, stderr) => {
            if (error) return reject(error);

            if (stderr) {
              return reject(new Error(stderr));
            }

            try {
              const resultJSON: any = JSON.parse(stdout || "{}");
              resultJSON.usuarios = resultJSON.usuarios
                ? resultJSON.usuarios
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

  public async deleteUser(NumeroCredencial: number): Promise<boolean> {
    const command = "deleteUser";
    return new Promise((resolve, reject) => {
      try {
        exec(
          `${this.clock} "${this.ip}" "${command}" "${NumeroCredencial}"`,
          (err) => {
            if (err) throw err;
          }
        );
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }
}
