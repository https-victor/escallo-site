export const getMenuItemFunction = (action) => {
  switch (action) {
    case "mostrar_formulario_de_contato":
      return formModal.onShow;
    case "nenhum":
    default:
      return undefined;
  }
};
