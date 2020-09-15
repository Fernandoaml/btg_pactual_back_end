import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// import Issues from './Issue';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  // @OneToMany(() => Issues, issue => issue.repository)
  // issuesId: Issues[];

  @Column()
  password: string;

  @Column()
  ip: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}

export default User;
