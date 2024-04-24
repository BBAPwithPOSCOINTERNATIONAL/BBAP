import { useRef } from "react";

function useMoveScroll(offset: number = 0) {
  // HTMLDivElement를 useRef의 제너릭 타입으로 명시합니다.
  const element = useRef<HTMLDivElement>(null);

  const onMoveToElement = () => {
    if (element.current) {
      const elementPosition =
        element.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };
  return { element, onMoveToElement };
}

export default useMoveScroll;
