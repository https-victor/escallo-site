import styles from "/styles/home.module.scss";
import { Formik } from "formik";
import * as yup from "yup";
import Form from "react-bootstrap/Form";

const schema = yup.object().shape({
  nome: yup.string().required("Informe o seu nome"),
  email: yup
    .string()
    .required("Informe o seu e-mail")
    .email("O e-mail está em um formato incorreto"),
  termos: yup
    .bool()
    .required()
    .oneOf([true], "Você deve estar de acordo com a Política de Privacidade"),
});

export default function Newsletter({ onSubmitCB }) {
  function onSubmit(values) {
    console.log(values);
    onSubmitCB();
  }
  return (
    <Formik
      validationSchema={schema}
      onSubmit={onSubmit}
      initialValues={{
        nome: "",
        email: "",
        termos: false,
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => {
        return (
          <Form className={styles.form} noValidate onSubmit={handleSubmit}>
            <Form.Group>
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
            <Form.Group controlId="validationFormik02">
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
            <Form.Group>
              <Form.Check
                required
                name="termos"
                label="Li e concordo com a Política de Privacidade"
                onChange={handleChange}
                isInvalid={!!errors.termos}
                feedback={errors.termos}
                feedbackType="invalid"
                id="validationFormik0"
              />
            </Form.Group>
            <button className={styles.submit} type="submit">
              INSCREVER
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
