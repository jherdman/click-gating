import { useCallback, useEffect, useState } from "react";

interface Props {
  shouldOpen: boolean;
}

export default function Modal({ shouldOpen }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(0);

  useEffect(() => {
    console.debug("TRIGGERED", { shouldOpen, isOpen, timeoutId });

    if (isOpen === shouldOpen) {
      console.debug("Aborting: isOpen === shouldOpen", { isOpen, shouldOpen });
      return;
    }

    if (timeoutId > 0) {
      console.debug("Aborting: timeoutId > 0", { timeoutId });
      return;
    }

    console.debug("Setting timeoutId", { shouldOpen, isOpen });

    const newTimeoutId = setTimeout(
      () => {
        console.debug("Setting isOpen", { shouldOpen });
        setIsOpen(shouldOpen);
        console.debug("Releasing mutex");
        setTimeoutId(0);
      },
      shouldOpen ? 150 : 300
    );

    console.debug("newTimeoutId", { newTimeoutId });
    setTimeoutId(newTimeoutId);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [shouldOpen, timeoutId, isOpen]);

  return (
    <dialog open={isOpen} className={shouldOpen ? "fade-in" : "fade-out"}>
      <img
        src="https://c.tenor.com/WuOwfnsLcfYAAAAC/star-wars-obi-wan-kenobi.gif"
        width="480"
        height="230"
      />
    </dialog>
  );
}
