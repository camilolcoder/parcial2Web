import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { FotoEntity } from "../foto/foto.entity";

@Entity()
export class AlbumEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    fechaInicio: Date;

    @Column()
    fechaFin: Date;  

    @Column()
    titulo: string;

    @OneToMany(() => FotoEntity, foto => foto.album)
    fotos: FotoEntity[]
}