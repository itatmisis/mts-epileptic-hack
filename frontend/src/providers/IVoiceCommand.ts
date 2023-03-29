export interface IVoiceCommand {
  action:
    | "volume_up"
    | "volume_down"
    | "brightness_up"
    | "brightness_down"
    | "contrast_up"
    | "contrast_down"
    | "saturation_up"
    | "saturation_down"
    | "pause/play"
    | "skip"
    | "trash";
  descriptor: "до" | "на" | "максимум или минимум или константное значение";
  value?: number;
}
