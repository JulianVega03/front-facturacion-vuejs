<template>
  <div class="home">
    <div class="container">
      <div>
        <h2>Mis Facturas</h2>
        <br /><br />

        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th># Factura</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Subtotal</th>
              <th>Total</th>
              <th>Ver Detalles</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="factura in facturas" :key="factura.numFactura">
              <th scope="row">{{ factura.numFactura }}</th>
              <td>{{ factura.nomCliente }}</td>
              <td>{{ factura.fecha | format }}</td>
              <td>{{ factura.subtotal }}</td>
              <td>{{ factura.total }}</td>
              <td>
                <b-icon
                  icon="check-square"
                  scale="2"
                  variant="success"
                  @click="verFactura(factura.numFactura)"
                ></b-icon>
              </td>
              <td>
                <b-icon
                  icon="pencil-square"
                  scale="2"
                  variant="warning"
                  @click="editFactura(factura.numFactura)"
                ></b-icon>
              </td>
              <td>
                <b-icon
                  icon="x-circle"
                  scale="2"
                  variant="danger"
                  @click="deleteFactura(factura.numFactura)"
                ></b-icon>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const URL = "http://localhost:8080/facturas-ws/api/factura/";

export default {
  name: "Home",
  data() {
    return {
      facturas: [],
    };
  },
  methods: {
    getFacturas() {
      axios.get(URL).then((datos) => {
        this.facturas = datos.data;
      });
    },
    editFactura(numFactura) {
      this.$router.push("/editar/" + numFactura);
    },
    deleteFactura(numFactura) {
      axios.delete(URL + numFactura).then((datos) => {
        if (datos.status === 200) {
          alert("se elimino de forma exitos la factura #" + numFactura);
        }
      });

      var results = this.facturas.filter(function (nickname) {
        return nickname.numFactura == numFactura;
      });
      var firstObj = results.length > 0 ? results[0] : null;
      this.removeItemFromArr(this.facturas, firstObj);
    },
    verFactura(numFactura) {
      this.$router.push("/factura/" + numFactura);
    },
    removeItemFromArr(arr, item) {
      var i = arr.indexOf(item);

      if (i !== -1) {
        arr.splice(i, 1);
      }
    },
  },
  mounted() {
    this.getFacturas();
  },
  filters: {
    format: function (value) {
      return value.slice(0, -15);
    },
  },
};
</script>
