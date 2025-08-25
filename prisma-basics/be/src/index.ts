import { PrismaClient } from "@prisma/client"; // just like importing mongodb

//creating instance
const client = new PrismaClient();

async function createUser() {
  const res = await client.user2.create({
    data: {
      username: "Ujwal",
      password: "123456",
      age: 21,
      city: "Amritsar",
    },
  });
  console.log(res);
}

// createUser();

async function createTodo() {
  const res = await client.todo.create({
    data: {
      title: "DSA",
      description: "Complete 2 questions",
      done: false,
      userId: 1,
    },
  });
  console.log(res);
}

// createTodo();

async function getUserDetails() {
  const res = await client.user2.findUnique({
    where: {
      id: 1,
    },
    include: {
      todos: true,
    },
  });
  console.log(res);
}

getUserDetails();
