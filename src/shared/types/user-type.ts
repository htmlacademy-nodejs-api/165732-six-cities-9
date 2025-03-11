export enum UserType {
    Pro = 'pro',
    Ordinary = 'ordinary'
}

export type User = {
    email: string;
    avatarPath: string;
    name: string;
    type: UserType;
  }
