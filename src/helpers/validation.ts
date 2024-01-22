import * as Yup from "yup";

import backgrounds from "@/helpers/backgrounds.json";
import musicList from "@/helpers/music.json";

const knownMusicValues = musicList.map((item) => item.fileName) ?? [];
const knownBackgroundValues = backgrounds.map((item) => item.fileName);

export const postcardFormValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  text: Yup.string().required("Text is required"),
  music: Yup.string()
    .oneOf(knownMusicValues, "Invalid music selection")
    .optional(),
  background: Yup.string()
    .oneOf(knownBackgroundValues, "Invalid background selection")
    .optional(),
  recipient: Yup.object().shape({
    name: Yup.string().required("Recipient name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Recipient email is required"),
  }),
  sender: Yup.object().shape({
    name: Yup.string().required("Sender name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Sender email is required"),
  }),
});
