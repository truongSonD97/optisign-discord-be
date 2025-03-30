import { BeforeInsert, Column, CreateDateColumn } from "typeorm";

export abstract class MessageBaseColumn {
  @Column({ type: "bigint", transformer: {
    to: (value: number) => value,  // Save as is
    from: (value: string) => Number(value)  // Convert from string to number
  }})
  createdAt: number;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = Date.now(); // Store as a Unix timestamp (milliseconds)
  }
}

export abstract class BaseEntity {
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;
}
