import { v4 as uuidv4 } from "uuid";

let users = [];

export const getUsers = (req, res) => {
  res.send(users);
};

export const createUsers = (req, res) => {
  const user = req.body;

  users.push({ ...user, id: uuidv4() });

  res.send(`user with name ${user.firstName} was added to datbase`);
};

export const getUser = (req, res) => {
  const { id } = req.params;

  const finduser = users.find((user) => user.id === id);

  res.send(finduser);
};

export const deleteUser = (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id !== id);

  res.send(users);
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;
  users = users.find((user) => user.id === id);

  if (firstName) users.firstName = firstName;
  if (lastName) users.lastName = lastName;
  if (age) users.age = age;

  res.send(`User with the ${id} has been updated`);
};
