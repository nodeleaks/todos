import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

enum Status {
    Todo = 'Todo',
    Done = 'Done'
}

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    summary: string;

    @Column()
    description: string;

    @Column('int', {default: 'Todo'})
    status: Status
}
