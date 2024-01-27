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
  <div className=" flex flex-col text-mainBlue gap-1 text-[18px] sm:text-[16px]">
    <p>{label}</p>
    <div className="flex flex-col sm:flex-row sm:self-end">
      <label className="w-14">Name:</label>
      <input
        required
        size={20}
        className="border border-1 border-heavyBlue w-full sm:w-auto"
        value={person.name}
        onChange={(e) =>
          updateValue({
            ...person,
            name: e.target.value.toString(),
          })
        }
      ></input>
    </div>
    <div className="flex flex-col sm:flex-row sm:self-end">
      <label className="sm:w-14">email:</label>
      <input
        type="email"
        required
        size={20}
        className="border border-1 border-heavyBlue w-full sm:w-auto"
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
