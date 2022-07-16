import { CreateUserDto, User } from "@monorepo/common";

export class UserService {
  static #users: User[] = [];

  getUsers() {
    return UserService.#users;
  }

  addUser(createUserDto: CreateUserDto) {
    const id = UserService.#users.length + 1;
    const user = {
      ...createUserDto,
      id,
    };
    UserService.#users.push(user);

    return id;
  }

  getUser(id: number) {
    return UserService.#users.find(user => user.id === id);
  }

  deleteUser(id: number) {
    UserService.#users = UserService.#users.filter(user => user.id !== id);
  }
}