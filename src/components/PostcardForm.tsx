"use client";
const HSeparator = () => (
  <div className=" mt-4 mb-2  w-full border border-b-[0.5px] opacity-50 border-heavyBlue"></div>
);

import Image from "next/image";
import { Select } from "./Select";
import { Wrapper } from "./Wrapper";
import backgrounds from "@/helpers/backgrounds.json";
import musicList from "@/helpers/music.json";
import titles from "@/helpers/titles";
import { useState } from "react";

export default function PostcardForm({
  imagePath,
  onBack,
  onNext,
}: {
  imagePath: string;
  onBack: () => void;
  onNext: (params: any) => void;
}) {
  const [title, setTitle] = useState("Hi!");
  const [text, setText] = useState("");
  const [music, setMusic] = useState("");
  const [recipient, setRecipient] = useState({
    name: "",
    email: "",
  });
  const [sender, setSender] = useState({ name: "", email: "" });

  return (
    <div>
      <Wrapper>
        <Image src={imagePath} height={300} width={400} alt={imagePath} />
        <HSeparator />
        <div className="flex gap-2">
          <div className="mt-8">
            <div className="flex gap-2 items-end ml-8 mb-1">
              <Image src={"/book.gif"} alt="book" height={40} width={28} />
              <select
                className="bg-white border border-1 border-heavyBlue h-fit text-sm text-heavyBlue pl-1"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                name="subj"
              >
                {titles.eng.map((o) => (
                  <option key={o} className="text-sm text-mainBlue">
                    {o}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={9}
              cols={40}
              className="bg-white border border-1 border-heavyBlue"
            ></textarea>
          </div>
          <div className="border border-l-[0.5px] opacity-50 border-heavyBlue"></div>
          <div className="flex flex-col">
            <Image
              src={"/compose-stamp.gif"}
              alt="book"
              height={153}
              width={251}
              className="self-end"
            />
            <div className=" flex flex-col text-mainBlue gap-1">
              <p>To</p>
              <div className="flex self-end">
                <label className="w-14">Name:</label>
                <input
                  required
                  size={20}
                  className="border border-1 border-heavyBlue"
                  value={recipient.name}
                  onChange={(e) =>
                    setRecipient({
                      ...recipient,
                      name: e.target.value,
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
                  value={recipient.email}
                  onChange={(e) =>
                    setRecipient({
                      ...recipient,
                      email: e.target.value,
                    })
                  }
                ></input>
              </div>
            </div>
            <HSeparator />
            <div className=" flex flex-col text-mainBlue gap-1">
              <p>From</p>
              <div className="flex self-end">
                <label className="w-14">Name:</label>
                <input
                  required
                  size={20}
                  className="border border-1 border-heavyBlue"
                  value={sender.name}
                  onChange={(e) =>
                    setSender({
                      ...sender,
                      name: e.target.value,
                    })
                  }
                ></input>
              </div>
              <div className="flex self-end">
                <label className="w-14">email:</label>
                <input
                  required
                  size={20}
                  className="border border-1 border-heavyBlue"
                  value={sender.email}
                  onChange={(e) =>
                    setSender({
                      ...sender,
                      email: e.target.value,
                    })
                  }
                ></input>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
      <div className="flex flex-col border border-1 border-heavyBlue p-2 mt-10">
        <p className="text-mainBlue">
          You can customize the following settings to your liking:
        </p>
        <Select name="background" className="my-2">
          {backgrounds.map((item) => (
            <option key={item.fileName} className="text-sm text-mainBlue">
              {item.rusName}
            </option>
          ))}
        </Select>
        <Select
          name="music"
          className="my-10"
          value={music}
          onChange={(e) => {
            setMusic(e.target.value);
          }}
        >
          {musicList.map((item) => (
            <option key={item.fileName} className="text-sm text-mainBlue">
              {item.rusName}
            </option>
          ))}
        </Select>
      </div>
      <div className="flex justify-between w-full mt-4">
        <input
          type="button"
          className="border-2 border-mainBlue px-1"
          value="Back"
          onClick={onBack}
        ></input>
        <button
          type="submit"
          className="border-2 border-mainBlue px-1"
          onClick={() =>
            onNext({
              title,
              text,
              sender,
              recipient,
              music:
                musicList.find((val) => val.rusName === music)?.fileName ?? "",
            })
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}
