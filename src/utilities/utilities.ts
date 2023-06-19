import { faker } from "@faker-js/faker";
import { UserProperties } from "../Users";

// interface FakeUser {
//   firstName: string;
//   lastName: string;
//   email: string;
//   username: string;
//   password: string;
// }

export const addUsers = (num: number) => {
  let array = [];
  for (let i = 0; i < num; i++) {
    const user = {
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      password: "",
    };
    user.firstname = faker.person.firstName();
    user.lastname = faker.person.lastName();
    user.email = faker.internet.email();
    user.username = faker.internet.userName();
    user.password = faker.internet.password();

    array.push(user);
  }
  return array;
};

export const sortList = (data: UserProperties[], header: string) => {
  const dataCopy = data.slice();
  return dataCopy.sort((a: any, b: any) => {
    if (a[header].toLowerCase() < b[header].toLowerCase()) {
      return -1;
    }
    if (a[header].toLowerCase() > b[header].toLowerCase()) {
      return 1;
    }
    return 0;
  });
};
