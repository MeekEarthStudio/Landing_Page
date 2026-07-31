// The released catalog — files live in the GCS assets bucket root.
export const TRACKS = [
  { file: "And_Suddenly_It_Hurts.wav", title: "And Suddenly It Hurts" },
  { file: "Faith_has_power.wav", title: "Faith Has Power" },
  { file: "Free_from_Myself.wav", title: "Free from Myself" },
  { file: "Freedom.wav", title: "Freedom" },
  { file: "God_Designed.wav", title: "God Designed" },
  { file: "I_Cry_to_jesus.wav", title: "I Cry to Jesus" },
  { file: "I_Don_t_Know_Why.wav", title: "I Don't Know Why" },
  { file: "She_said_she_loves_me.wav", title: "She Said She Loves Me" },
] as const;

export const mediaIdFor = (file: string) => file.replace(/\.wav$/i, "").toLowerCase();

export const titleForMediaId = (mediaId: string) =>
  TRACKS.find((t) => mediaIdFor(t.file) === mediaId)?.title ?? mediaId;
