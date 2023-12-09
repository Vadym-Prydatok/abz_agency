export const handleInput =
  (ref: React.RefObject<HTMLInputElement>) =>
  (
    e: React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    const isActive = ref.current?.value !== "" || e.type === "focus";
    const spanElement = e.target.previousSibling as HTMLElement;
    spanElement.classList.toggle("active", isActive);
  };
