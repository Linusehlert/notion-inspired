import { DocumentContext } from "../../context/DocumentContext";
import { useContext } from "react";

export const useDocumentContext = () => {
  const context = useContext(DocumentContext);

  if (!context) {
    throw Error(
      "useProjectContext must be used inside a ProjectContextProvider"
    );
  }
  return context;
};
