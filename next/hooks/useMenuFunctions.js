import { useContext } from "react";
import AppContext from "/context/AppContext";

const useMenuFunctions = () => {
  const { formModal, meLigueModal } = useContext(AppContext);
  function getFunction(action) {
    switch (action) {
      case "mostrar_formulario_de_contato":
        return formModal.onShow;
      case "mostrar_formulario_me_ligue":
        return meLigueModal.onShow;
      case "nenhum":
      default:
        return undefined;
    }
  }
  return getFunction;
};

export default useMenuFunctions;
