import { Elysia } from "elysia";
import { Timer } from "./Classes/timer";
import { User } from "./Classes/user";


const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

console.log(
  `🦊 Timer server is running at ${app.server?.hostname}:${app.server?.port}`
);

const timer = new Timer("1", "Test Timer", 10, "Il Dottore");

timer.start();

const aUser = new User();
console.log(`We made a user. Their name is: ${aUser.name}`);