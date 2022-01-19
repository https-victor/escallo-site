import styles from "/styles/home.module.scss";
import { Formik } from "formik";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import classNames from "classnames";

const schema = yup.object().shape({
  nome: yup.string().required("Informe o seu nome"),
  empresa: yup
    .string()
    .required("Informe a empresa")
    .email("O e-mail está em um formato incorreto"),
  telefone: yup.string().required("Informe o seu telefone"),
  email: yup
    .string()
    .required("Informe o seu e-mail")
    .email("O e-mail está em um formato incorreto"),
  mensagem: yup.string().required("Envie uma mensagem"),
  quantidade: yup
    .string()
    .required("Este campo é obrigatório")
    .oneOf(["0 a 3", "4 a 10", "Acima de 10"], "Selecione uma das opções"),
  comoConheceu: yup
    .string()
    .required("Este campo é obrigatório")
    .oneOf(["Pesquisa na internet"], "Selecione uma das opções"),
  termos: yup
    .bool()
    .required()
    .oneOf([true], "Você deve estar de acordo com a Política de Privacidade"),
});
export default function Contato({ onSubmitCB }) {
  function onSubmit(values) {
    console.log(values);
    onSubmitCB();
  }
  return (
    <Formik
      validationSchema={schema}
      onSubmit={onSubmit}
      validateOnChange={false}
      initialValues={{
        nome: "",
        empresa: "",
        telefone: "",
        email: "",
        mensagem: "",
        quantidade: "",
        comoConheceu: "",
        termos: false,
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => {
        return (
          <Form className={styles.form} noValidate onSubmit={handleSubmit}>
            <div className={styles.formItems}>
              <Form.Group
                className={classNames(
                  styles.formItem,
                  touched.nome && errors.nome ? "invalid" : ""
                )}
              >
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nome"
                  name="nome"
                  value={values.nome}
                  onChange={handleChange}
                  isInvalid={!!errors.nome}
                  isValid={touched.nome && !errors.nome}
                />
                {touched.nome && errors.nome && (
                  <Form.Control.Feedback type={errors.nome && "invalid"}>
                    {errors.nome}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group
                className={classNames(
                  styles.formItem,
                  touched.empresa && errors.empresa ? "invalid" : ""
                )}
              >
                <Form.Label>Empresa</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Empresa"
                  name="empresa"
                  value={values.empresa}
                  onChange={handleChange}
                  isInvalid={!!errors.empresa}
                  isValid={touched.empresa && !errors.empresa}
                />
                {touched.empresa && errors.empresa && (
                  <Form.Control.Feedback type={errors.empresa && "invalid"}>
                    {errors.empresa}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </div>
            <div className={styles.formItems}>
              <Form.Group
                className={classNames(
                  styles.formItem,
                  touched.telefone && errors.telefone ? "invalid" : ""
                )}
              >
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Telefone"
                  name="telefone"
                  value={values.telefone}
                  onChange={handleChange}
                  isInvalid={!!errors.telefone}
                  isValid={touched.telefone && !errors.telefone}
                />
                {touched.telefone && errors.telefone && (
                  <Form.Control.Feedback type={errors.telefone && "invalid"}>
                    {errors.telefone}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group
                className={classNames(
                  styles.formItem,
                  touched.email && errors.email ? "invalid" : ""
                )}
                controlId="validationFormik02"
              >
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  placeholder="E-mail"
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  isValid={touched.email && !errors.email}
                />

                {touched.email && errors.email && (
                  <Form.Control.Feedback type={errors.email && "invalid"}>
                    {errors.email}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </div>
            <Form.Group
              className={touched.mensagem && errors.mensagem ? "invalid" : ""}
            >
              <Form.Label>Mensagem</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                placeholder="Mensagem"
                name="mensagem"
                value={values.mensagem}
                onChange={handleChange}
                isInvalid={!!errors.mensagem}
                isValid={touched.mensagem && !errors.mensagem}
              />
              {touched.mensagem && errors.mensagem && (
                <Form.Control.Feedback type={errors.mensagem && "invalid"}>
                  {errors.mensagem}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <div className={styles.formItems}>
              <Form.Group
                className={classNames(
                  styles.formItem,
                  touched.quantidade && errors.quantidade ? "invalid" : ""
                )}
              >
                <Form.Label>
                  Quantos atendentes sua central de atendimento possui?
                </Form.Label>
                <Form.Select
                  name="quantidade"
                  value={values.quantidade}
                  isInvalid={!!errors.quantidade}
                  onChange={handleChange}
                  isValid={touched.quantidade && !errors.quantidade}
                >
                  <option>---</option>
                  <option value="0 a 3">0 a 3</option>
                  <option value="4 a 10">4 a 10</option>
                  <option value="Acima de 10">Acima de 10</option>
                </Form.Select>
                {touched.quantidade && errors.quantidade && (
                  <Form.Control.Feedback type={errors.quantidade && "invalid"}>
                    {errors.quantidade}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group
                className={classNames(
                  styles.formItem,
                  touched.comoConheceu && errors.comoConheceu ? "invalid" : ""
                )}
              >
                <Form.Label>Como conheceu o escallo?</Form.Label>
                <Form.Select
                  name="comoConheceu"
                  value={values.comoConheceu}
                  onChange={handleChange}
                  isInvalid={!!errors.comoConheceu}
                  isValid={touched.comoConheceu && !errors.comoConheceu}
                >
                  <option>---</option>
                  <option value="Pesquisa na internet">
                    Pesquisa na internet
                  </option>
                  <option value="Indicação">Indicação</option>
                </Form.Select>
                {touched.comoConheceu && errors.comoConheceu && (
                  <Form.Control.Feedback
                    type={errors.comoConheceu && "invalid"}
                  >
                    {errors.comoConheceu}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </div>
            <Form.Group
              className={classNames(
                styles.formItem,
                styles.confirmForm,
                touched.termos && errors.termos ? "invalid" : ""
              )}
            >
              <Form.Check
                required
                name="termos"
                label={
                  <span>
                    Li e concordo com a{" "}
                    <a href={"/politica-de-privacidade"} target="_blank">
                      Política de Privacidade
                    </a>
                  </span>
                }
                onChange={handleChange}
                isInvalid={!!errors.termos}
                feedback={errors.termos}
                feedbackType="invalid"
                id="validationFormik0"
              />
            </Form.Group>
            <button className={styles.submitForm} type="submit">
              Enviar
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
