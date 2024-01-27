"use client";
const HSeparator = () => (
  <div className=" mt-4 mb-2  w-full border border-b-[0.5px] opacity-50 border-heavyBlue"></div>
);

import { CardParameters, Person } from "@/helpers/types";
import { useEffect, useState } from "react";

import AddressFields from "./AddressFields";
import Image from "next/image";
import { Select } from "./Select";
import { Wrapper } from "./Wrapper";
import backgrounds from "@/helpers/backgrounds.json";
import musicList from "@/helpers/music.json";
import { postcardFormValidationSchema } from "@/helpers/validation";
import titles from "@/helpers/titles";

export default function PostcardForm({
  imagePath,
  params,
  onBack,
  onNext,
}: {
  imagePath: string;
  params?: any;
  onBack: () => void;
  onNext: (params: any) => void;
}) {
  const [chosenSongName, setChosenSongName] = useState("no music");
  const [chosenBackground, setChosenBackground] = useState("");
  useEffect(() => {
    if (params.music) {
      setChosenSongName(
        musicList.find((item) => item.fileName == params.music)?.rusName ??
          "no music"
      );
    }
    if (params.background) {
      setChosenBackground(
        backgrounds.find((item) => item.fileName === params.background)?.eng ??
          ""
      );
    }
  }, []);
  const [errors, setErrors] = useState<Array<string>>([]);
  const [cardParams, setCardParams] = useState<CardParameters>({
    title: params.title ?? "Hi!",
    text: params.text ?? "",
    music: params.music ?? "",
    background: params.background ?? "",
    recipient: {
      name: params.recipient.name ?? "",
      email: params.recipient.email ?? "",
    },
    sender: {
      name: params.sender.name ?? "",
      email: params.sender.email ?? "",
    },
  });

  const updateCardParams = (property: string, value: any) => {
    setCardParams((prevCardParams) => ({
      ...prevCardParams,
      [property]: value,
    }));
  };

  useEffect(() => {
    if (chosenSongName) {
      const fileName = musicList.find((item) => item.rusName == chosenSongName);
      updateCardParams("music", fileName?.fileName);
    }
  }, [chosenSongName]);

  useEffect(() => {
    if (chosenBackground) {
      updateCardParams(
        "background",
        backgrounds.find((item) => item.eng === chosenBackground)?.fileName ??
          ""
      );
    }
  }, [chosenBackground]);

  return (
    <div>
      <Wrapper>
        <Image src={imagePath} height={300} width={400} alt={imagePath} />
        <HSeparator />
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="mt-8">
            <div className="flex gap-2 items-end ml-8 mb-1">
              <Image src={"/book.gif"} alt="book" height={40} width={28} />
              <select
                className="bg-white border border-1 border-heavyBlue h-fit text-sm text-heavyBlue pl-1"
                value={cardParams.title}
                onChange={(e) => updateCardParams("title", e.target.value)}
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
              value={cardParams.text}
              onChange={(e) => updateCardParams("text", e.target.value)}
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
            <AddressFields
              label="To"
              person={cardParams.recipient}
              updateValue={(v: Person) => updateCardParams("recipient", v)}
            />

            <HSeparator />
            <AddressFields
              label="From"
              person={cardParams.sender}
              updateValue={(v: Person) => updateCardParams("sender", v)}
            />
          </div>
        </div>
      </Wrapper>
      <div className="flex flex-col border border-1 border-heavyBlue p-2 mt-10 text-[18px] sm:text-[16px]">
        <p className="text-mainBlue">
          You can customize the following settings to your liking:
        </p>
        <Select
          name="background"
          className="my-2 text-[18px] sm:text-[16px]"
          value={chosenBackground}
          onChange={(e) => setChosenBackground(e.target.value)}
        >
          {backgrounds.map((item, idx) => (
            <option
              key={`${idx}-${item.fileName}`}
              className="text-sm text-mainBlue"
            >
              {item.eng}
            </option>
          ))}
        </Select>
        <Select
          name="music"
          className="my-10 text-[18px] sm:text-[16px] w-full sm:w-auto"
          value={chosenSongName}
          onChange={(e) => setChosenSongName(e.target.value)}
        >
          {musicList.map((item) => (
            <option key={item.fileName} className="text-sm text-mainBlue">
              {item.rusName}
            </option>
          ))}
        </Select>
      </div>
      <div className="h-14 sm:h-10  flex gap-x-3 flex-wrap">
        {!!errors.length && (
          <p className="text-red-500 "> {errors.length} errors: </p>
        )}
        {errors.map((e) => (
          <p key={e}>{e}</p>
        ))}
      </div>

      <div className="flex  justify-evenly sm:justify-between w-full mt-4">
        <input
          type="button"
          className="border-2 border-mainBlue px-1  text-[18px] sm:text-[16px] "
          value="Back"
          onClick={onBack}
        ></input>
        <button
          type="submit"
          className="border-2 border-mainBlue px-1  text-[20px] sm:text-[16px] "
          onClick={() => {
            postcardFormValidationSchema
              .validate(cardParams, { abortEarly: false })
              .then((valid) => {
                console.log("Form is valid:", valid);
                onNext(cardParams);
              })
              .catch((errors) => {
                setErrors(errors.errors);
                console.error("Validation errors:", errors.errors);
              });
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
