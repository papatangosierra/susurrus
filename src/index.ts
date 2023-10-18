import { Elysia } from "elysia";
import { Timer } from "./Classes/timer";
import { User } from "./Classes/user";
import { UserLabel } from "./Classes/userLabel";

const app = new Elysia().get("/", index).listen(3000);

function index(): string {
  const newUserLabel = new UserLabel();
  const user = new User(newUserLabel);
  console.log(
    `We made a user. Their name is: ${user.name}. Their ID is ${user.id}`
  );
  const newTimer = new Timer(Date.now().toString(), "Test Timer", 10, user.id);
  newTimer.start();
  return `Hello, user ${user.name}.`;
}

console.log(
  `🦊 Timer server is running at ${app.server?.hostname}:${app.server?.port}`
);
