const keyStrokeSound = [
  new Audio("sounds/keystroke1.mp3"),
  new Audio("sounds/keystroke2.mp3"),
  new Audio("sounds/keystroke3.mp3"),
  new Audio("sounds/keystroke4.mp3"),
];

function useKeyBoardSound() {
  const playRandomKeyStrokeSound = () => {
    const randomSound =
      keyStrokeSound[Math.floor(Math.random() * keyStrokeSound.length)];

    randomSound.currentTime = 0;
    randomSound
      .play()
      .catch((error) => console.error("Audio play failed: ", error));
  };

  return { playRandomKeyStrokeSound };
}

export default useKeyBoardSound;
