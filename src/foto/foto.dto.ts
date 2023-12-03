import {IsNotEmpty, IsString, IsUrl} from 'class-validator';

export class FotoDTO {

    readonly ISO: string;

    readonly velObturacion: string;
    
    readonly apertura: string;

    readonly fecha: string;

}