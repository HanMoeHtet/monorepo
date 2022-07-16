import { UserApiService } from '@monorepo/api-sdk';
import { User, greet } from '@monorepo/common';
import './style.css';

greet();

const app = document.querySelector('#app')!;
const usersListEl = app.querySelector('[data-users-list]')!;
const usersListItemTemplate = app.querySelector(
  '[data-users-list-item-template]'
)! as HTMLTemplateElement;
const createUserForm = document.forms.namedItem('create-user')!;

const userApiService = new UserApiService();

const buildCreateUserForm = () => {
  createUserForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(createUserForm);
    const createUserDto = {
      name: formData.get('name') as string,
    };
    const createUserResponse = await userApiService.createUser(createUserDto);
    const getUserResponse = await userApiService.getUser(
      createUserResponse.data.userId
    );

    usersListEl.appendChild(buildUsersListItem(getUserResponse.data.user));
  });
};

const buildUsersListItem = (user: User) => {
  const usersListItemEl =
    usersListItemTemplate.content.firstElementChild!.cloneNode(
      true
    ) as HTMLLIElement;
  usersListItemEl.querySelector('[data-id]')!.textContent = user.id.toString();
  usersListItemEl.querySelector('[data-name]')!.textContent = user.name;
  const deleteButton = usersListItemEl.querySelector(
    '[data-delete-button]'
  )! as HTMLButtonElement;
  deleteButton.addEventListener('click', async () => {
    await userApiService.deleteUser(user.id);

    usersListEl.removeChild(usersListItemEl);
  });
  return usersListItemEl;
};

const buildUsersList = (users: User[]) => {
  users.forEach((user) => {
    usersListEl.appendChild(buildUsersListItem(user));
  });
};

const loadUsers = async () => {
  const getUsersResponse = await userApiService.getUsers();
  buildUsersList(getUsersResponse.data.users);
};

const reload = async () => {
  await loadUsers();
};

const main = async () => {
  await reload();
  buildCreateUserForm();
};

main();
