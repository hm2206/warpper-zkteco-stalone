import { PermissionsEnum } from "../enums/permissions.enum";
import { FingerPrintEntity } from "./finger-print.entity";

export interface UserEntity {
  NumeroCredencial: number;
  Nomber: string;
  Permiso: PermissionsEnum;
  Contrasenia: string;
  Huellas: FingerPrintEntity[];
  Activo: boolean;
}
