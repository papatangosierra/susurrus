import { Elysia } from "elysia";
import { Timer } from "./Classes/timer";
import { User } from "./Classes/user";
import { UserLabel } from "./Classes/userLabel";


const newUserLabel = new UserLabel();
const user = new User(newUserLabel);
console.log(`We made a user. Their name is: ${user.name}. Their ID is ${user.id}`);

const newTimer = new Timer("123", "Test Timer", 10, user.id);

newTimer.start();

const app = new Elysia().get("/", () => `Hello, user ${user.name}.`).listen(3000);

console.log(
  `🦊 Timer server is running at ${app.server?.hostname}:${app.server?.port}`
);