// Define the interface for the users class.
// A user will have:
// - an id
// - a name
// - a timer ID representing the timer they are currently joined to

export interface UserInterface {
  id: string;
  name: string;
  timerId: string | null;
}


