import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Host } from '../api/api';
import { map, size } from "lodash";
import { Link } from "react-router-dom";




const Tabla = () => {
    const [usuarios, mostrarUsuarios] = useState([]);

useEffect(() => {
  const obtenerUsuario = async () => {
    axios
      .get(Host)
      .then((response) => {
        // If request is good...
        mostrarUsuarios(response.data.data);
      })
      .catch((error) => {
        console.log("error " + error);
      });
  };
  obtenerUsuario();
}, []);

console.log("datos===========", usuarios);
    return (
      <>
        <h1> DATA</h1>
        <Link className='botonEnviar' to="/agregarData" class="botonEnviar">
          Agregar
        </Link>
        <table class="blue">
          <thead>
            <tr>
              <th>Nombres</th>
              <th>Email</th>
              <th>Documento</th>
              <th>Celular</th>
              <th>Nacionalidad</th>
            </tr>
          </thead>
          <tbody>
            {map(usuarios, (usuarios) => (
              <tr>
                <td>
                  {usuarios.firstName} {usuarios.lastName}
                </td>
                <td>{usuarios.email}</td>
                <td>{usuarios.sicCode}</td>
                <td>{usuarios.mobilePhone}</td>
                <td>{usuarios.nationality}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
}
 
export default Tabla;