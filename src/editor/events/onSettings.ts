import { modalSettings } from "../constants";
import settings from "../utils/settings";

export default function onSettings(e: any) {
  e.preventDefault();

  const elements = e.target.elements;
  const fontSize = elements[0].value;
  const theme = elements[1].value;

  settings().set({ fontSize, theme });

  modalSettings.classList.add('d-none');
}