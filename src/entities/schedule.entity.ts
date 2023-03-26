import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeInsert,
} from "typeorm";
import { RealEstate, User } from "./";

@Entity("schedules_users_properties")
class Schedule {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => User, (users) => users.schedules)
  user: User;

  @ManyToOne(() => RealEstate, (realEstates) => realEstates.schedules)
  realEstate: RealEstate;

  @BeforeInsert()
  verifyDate() {
    if (this.date) {
      this.date = new Date(this.date);
    }
  }
}

export { Schedule };
