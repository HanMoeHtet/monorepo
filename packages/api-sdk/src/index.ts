import { CreateUserDto, User } from '@monorepo/common';
import axios, { AxiosInstance } from 'axios';

export abstract class ApiService {
  private readonly BASE_URI = 'http://localhost:8000';

  public api: AxiosInstance;

  constructor(uri: string = '') {
    this.api = axios.create({
      baseURL: this.BASE_URI + uri,
    });
  }
}

export class UserApiService extends ApiService {
  constructor() {
    super('/users');
  }

  async getUsers() {
    return this.api.get<{
      users: User[];
    }>('/');
  }

  async getUser(id: number) {
    return this.api.get<{
      user: User;
    }>(`/${id}`);
  }

  async createUser(createUserDto: CreateUserDto) {
    return this.api.post<{ message: string; userId: number }>(
      '/',
      createUserDto
    );
  }

  async deleteUser(id: number) {
    return this.api.delete<void>(`/${id}`);
  }
}
