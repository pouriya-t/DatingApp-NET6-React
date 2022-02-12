import { User } from 'src/app/_models/user';
export class UserParams {
  gender: string;
  minAge = 10;
  maxAge = 99;
  pageNumber = 1;
  pageSize = 5;
  orderBy = 'lastActive';

  constructor(user: User) {
    this.gender = user.gender === 'female' ? 'male' : 'female';
  }
}
