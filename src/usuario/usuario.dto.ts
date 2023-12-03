import {IsNotEmpty, IsString, IsUrl} from 'class-validator';

export class UsuarioDTO {

    readonly nombre: string;

    readonly telefono: string;  

}