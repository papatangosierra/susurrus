// Library Imports
import { Sequelize } from "sequelize";
import { Elysia } from "elysia";

// My Imports
import { Timer } from "./Classes/timer";
import { User } from "./Classes/user";
import { UserData } from "./Classes/userData";
import { TimerEntity } from "./Classes/timerEntity";  
import { UserEntity } from "./Classes/userEntity";  

const app = new Elysia().get("/", index).listen(3000);

// const db = new Database("data/mydb.sqlite");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "data/mydb.sqlite"
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// Force our UserEntity table to sync, creating it if it doesn't already exist
await UserEntity.sync({ force: true });

// UserData is a class that generates a random user name and ID.
// It doesn't do anything else; it's just a username and ID pair.
// The User class is what we use to create a user object, and it
// takes a UserLabel as an argument. This lets us separate the 
// name and ID generation code from the user object itself.




/**
 * 
 * @returns string
 * index() is the function that will be called when the / route is hit.
 * The return value is a string that will be sent to the client.
 * (i.e., the HTML source we're sending to the browser)
 */
async function index(): Promise<string> {
  const newUserData = new UserData();
  const user = new User(newUserData);
  console.log(
    `We made a user. Their name is: ${user.name}. Their ID is ${user.id}`
  );

  // save user to database
  const newUserEntity = UserEntity.build({
    id: user.id,
    name: user.name
  });
  await newUserEntity.save();
  const newTimer = new Timer(Date.now().toString(), "Test Timer", 10, user.id);
  newTimer.start();

  return `Hello, user ${user.name}.`;
}

// print all users in the database
const allUsers = await UserEntity.findAll();
console.log("All users:", JSON.stringify(allUsers, null, 2));

// print count of users in the database every second
let pollcount = 0;
setInterval(async () => {
  const userCount = await UserEntity.count();
  console.log(`There are ${userCount} users in the database. poll: ${pollcount++}`);
}, 1000);


console.log(
  `🦊 Timer server is running at ${app.server?.hostname}:${app.server?.port}`
);
