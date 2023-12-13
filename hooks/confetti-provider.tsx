"use client";

import Confetti from "react-confetti";
import { useConfettiStore } from "./confetti-store";

export default function ConfettiProvider() {
  const state = useConfettiStore();

  if (!state.isOpen) return null;

  return (
    <Confetti
      numberOfPieces={1000}
      recycle={false}
      onConfettiComplete={() => state.onClose()}
    />
  );
}
