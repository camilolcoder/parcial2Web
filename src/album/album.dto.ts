import {IsNotEmpty, IsString, IsUrl} from 'class-validator';

export class AlbumDTO {

    readonly fechaInicio: string;

    readonly fechaFin: string;
    
    readonly titulo: string;

}