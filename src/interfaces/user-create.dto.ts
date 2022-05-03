import { PermissionsEnum } from "../enums/permissions.enum";

export interface IUserCreateDto {
  numberCredential: number;
  Nombre: string;
  permiso: PermissionsEnum;
  IndexHuella: number;
  b64Huella: string;
}
