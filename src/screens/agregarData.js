import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { map, size } from "lodash";
import { useNavigate } from "react-router-dom";
import { Countries, Host } from "../api/api";



const AgregarData = () => {
    const navigate = useNavigate();

    const [ciudades, mostrarCiudades] = useState([]);

    useEffect(() => {
      const obtenerciudades = async () => {
        axios
          .get(Countries)
          .then((response) => {
            // If request is good...
            mostrarCiudades(response.data);
          })
          .catch((error) => {
            console.log("error " + error);
          });
      };
      obtenerciudades();
    }, []);

    console.log("-------------", ciudades);

  /*===================================
Leemos y validamos los datos del form
=====================================*/

  const formik = useFormik({
    initialValues: {
      tipoDocumento: "",
      Identificacion: "",
      Nombres: "",
      Apellido: "",
      Nacionalidad: "",
      Celular: "",
      Email: "",
    },

    validationSchema: Yup.object({
      tipoDocumento: Yup.string().required(
        "El tipo de documento es obligatorio"
      ),
      Nombres: Yup.string().required("El nombre del usuario es obligatorio"),
      Identificacion: Yup.string().required(
        "El campo identificación es obligatorio"
      ),
      Apellido: Yup.string().required("El campo Apellido es obligatorio"),
      Nacionalidad: Yup.string().required(
        "El campo Nacionalidad es obligatorio"
      ),
      Celular: Yup.string().required("El campo Celular es obligatorio"),
      Email: Yup.string().required("El campo Email es obligatorio"),
    }),

      onSubmit: (Usuario) => {
        axios
          .post(`${Host}`, {
            firstName: Usuario.Nombres,
            lastName: Usuario.Apellido,
            email: Usuario.Email,
            sicCode: Usuario.Identificacion,
            sicCodeType: Usuario.tipoDocumento,
            mobilePhone: Usuario.Celular,
            nationality: Usuario.Nacionalidad,
            createdBy: Usuario.Nombres,
          })

          .then((res) => {
            alert("Usuario registrqado");
            navigate("/");
          });
    },
  });
  return (
    <>
      <h1>Agregar Usuario</h1>
      <div className="Container">
        <div className="left">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="categoria"
              >
                Tipo de documento
              </label>
              <select
                className="select"
                id="tipoDocumento"
                name="tipoDocumento"
                value={formik.values.tipoDocumento}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">====Seleccione la categoría====</option>
                <option value="cedula">Cedula de ciudadanía</option>
                <option value="pasaporte">Pasaporte</option>
                <option value="cedulaExtrangeria">ceudla de extrangería</option>
              </select>
            </div>
            {formik.touched.tipoDocumento && formik.errors.tipoDocumento ? (
              <div
                className="bg-red-100 border-l-4 border-red-500  text-red-700 p-4 mb-5"
                role="alert"
              >
                <p className="font-bold">Ups... Hubo un error:</p>
                <p>{formik.errors.tipoDocumento}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                Identificación
              </label>
              <input
                className="select"
                id="Identificacion"
                type="number"
                placeholder="Identificacion"
                value={formik.values.Identificacion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.Identificacion && formik.errors.Identificacion ? (
              <div
                className="bg-red-100 border-l-4 border-red-500  text-red-700 p-4 mb-5"
                role="alert"
              >
                <p className="font-bold">Ups... Hubo un error:</p>
                <p>{formik.errors.Identificacion}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="precio"
              >
                Nombre(s)
              </label>
              <input
                className="select"
                id="Nombres"
                type="text"
                placeholder="Nombres"
                min="1000"
                value={formik.values.Nombres}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.Nombres && formik.errors.Nombres ? (
              <div
                className="bg-red-100 border-l-4 border-red-500  text-red-700 p-4 mb-5"
                role="alert"
              >
                <p className="font-bold">Ups... Hubo un error:</p>
                <p>{formik.errors.Nombres}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="descripcion"
              >
                Apellido:
              </label>
              <input
                className="select"
                id="Apellido"
                type="text"
                placeholder="Apellido"
                value={formik.values.Apellido}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.Apellido && formik.errors.Apellido ? (
                <div
                  className="bg-red-100 border-l-4 border-red-500  text-red-700 p-4 mb-5"
                  role="alert"
                >
                  <p className="font-bold">Ups... Hubo un error:</p>
                  <p>{formik.errors.Apellido}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="restaurante"
                >
                  Nacionalidad
                </label>
                <select
                  className="select"
                  id="Nacionalidad"
                  name="Nacionalidad"
                  value={formik.values.Nacionalidad}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">====Seleccione el Nacionalidad====</option>
                  {map(ciudades, (ciudades) => (
                    <option value={ciudades.name}>{ciudades.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="precio"
                >
                  Celular
                </label>
                <input
                  className="select"
                  id="Celular"
                  type="number"
                  placeholder="Celular"
                  value={formik.values.Celular}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.Celular && formik.errors.Celular ? (
                <div
                  className="bg-red-100 border-l-4 border-red-500  text-red-700 p-4 mb-5"
                  role="alert"
                >
                  <p className="font-bold">Ups... Hubo un error:</p>
                  <p>{formik.errors.Celular}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="precio"
                >
                  Email
                </label>
                <input
                  className="select"
                  id="Email"
                  type="email"
                  placeholder="Email"
                  min="1000"
                  value={formik.values.Email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.Email && formik.errors.Email ? (
                <div
                  className="bg-red-100 border-l-4 border-red-500  text-red-700 p-4 mb-5"
                  role="alert"
                >
                  <p className="font-bold">Ups... Hubo un error:</p>
                  <p>{formik.errors.Email}</p>
                </div>
              ) : null}
              <input
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
                value="Agregar Usuario"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AgregarData;
