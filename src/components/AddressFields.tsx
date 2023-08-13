import * as React from "react";

import { Person } from "@/helpers/types";

export const AddressFields = ({
  label,
  person,
  updateValue,
}: {
  label: string;
  person: Person;
  updateValue: (v: Person) => void;
}) => (
  <div className=" flex flex-col text-mainBlue gap-1">
    <p>{label}</p>
    <div className="flex self-end">
      <label className="w-14">Name:</label>
      <input
        required
        size={20}
        className="border border-1 border-heavyBlue"
        value={person.name}
        onChange={(e) =>
          updateValue({
            ...person,
            name: e.target.value.toString(),
          })
        }
      ></input>
    </div>
    <div className="flex self-end">
      <label className="w-14">email:</label>
      <input
        type="email"
        required
        size={20}
        className="border border-1 border-heavyBlue"
        value={person.email}
        onChange={(e) =>
          updateValue({
            ...person,
            email: e.target.value.toString(),
          })
        }
      ></input>
    </div>
  </div>
);

export default AddressFields;
