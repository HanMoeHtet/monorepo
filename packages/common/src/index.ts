export interface User {
  id: number;
  name: string;
}

export interface CreateUserDto {
  name: string;
}

export const greet = () => {
  console.log("Hello, world!");
};
