/* eslint-disable camelcase */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import User from '../../users/models/User';

@Entity('projects')
class Project {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column('money')
    price: number;

    @Column('time with time zone')
    due_date: Date;

    @ManyToMany(type => User)
    @JoinTable({ name: 'project_users' })
    users: User[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Project;
