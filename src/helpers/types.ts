export type Person = {
  email: string;
  name: string;
};

export type CardParameters = {
  title: string;
  text: string;
  music: string;
  background: string;
  recipient: Person;
  sender: Person;
};
