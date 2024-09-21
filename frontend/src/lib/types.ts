export interface Event {
  id: string;
  title: string;
  date: Date;
  description: string;
  reminder: boolean;
  reminderTime: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthForm {
  name?: string;
  email: string;
  password: string;
}

export interface EventForm extends Partial<Event> {
  id?: string;
  reminderTime?: string;
}
