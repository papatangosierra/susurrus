// Library Imports
import { Elysia } from "elysia";

// My Imports
import { Timer } from "./Classes/timer";
import { User } from "./Classes/user";
import db from "./database";


const app = new Elysia().get("/", index).listen(3000);


/**
 * @returns string
 * index() is the function that will be called when the / route is hit.
 * The return value is a string that will be sent to the client.
 * (i.e., the HTML source we're sending to the browser)
 */
async function index(): Promise<string> {
  const user = new User();
  console.log(
    `We made a user. Their name is: ${user.name}. Their ID is ${user.id}`
  );

  const newTimer = new Timer(user.id, db);
  newTimer.setDuration(10);
  newTimer.start();
  return `Hello, user ${user.name}.`;
}


// print count of users in the database every second
// let pollcount = 0;
// setInterval(async () => {
//   const userCount = await UserEntity.count();
//   console.log(`There are ${userCount} users in the database. poll: ${pollcount++}`);
// }, 1000);


console.log(
  `🦊 Timer server is running at ${app.server?.hostname}:${app.server?.port}`
);
