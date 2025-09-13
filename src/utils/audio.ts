// utils/audio.ts
export function playBase64Audio(base64: string) {
  // tạo URL data:audio/mpeg;base64,...
  const audioUrl = `data:audio/mpeg;base64,${base64}`;

  // phát luôn
  const audio = new Audio(audioUrl);
  audio.play().catch(err => {
    console.error("Không thể phát:", err);
  });

  return audio; // trả về để có thể pause/stop sau này
}
