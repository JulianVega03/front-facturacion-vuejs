<template>
  <div class="home">
    <div class="container">
      <h2>Factura #{{ factura.id }}</h2>
      <br />
      <br />
      <h5>Nombre: {{ factura.nombre }}</h5>
      <h5>Fecha: {{ factura.fecha | format }}</h5>
      <br />
      <table class="table table-bordered table-hover">
        <thead class="table-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Articulo</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d in factura.detalles" :key="d.id">
            <td>{{ d.id }}</td>
            <td>{{ d.articulo }}</td>
            <td>{{ d.cantidad }}</td>
            <td>{{ d.valor }}</td>
          </tr>
        </tbody>
      </table>
      <h4>
        <b>Subtotal: ${{ factura.subtotal }}</b>
      </h4>
      <h4>
        <b>Total: ${{ factura.total }}</b>
      </h4>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const URL_SERVER = "http://localhost:8080/facturas-ws/api/factura/";

export default {
  name: "Home",
  data() {
    return {
      factura: {
        id: null,
        nombre: "",
        fecha: "",
        detalles: [],
        subtotal: null,
        total: null,
      },
    };
  },
  methods: {
    getFactura() {
      let url = URL_SERVER + this.$route.params.id;
      axios.get(url).then((datos) => {
        this.factura.nombre = datos.data.nomCliente;
        this.factura.id = datos.data.numFactura;
        this.factura.fecha = datos.data.fecha;
        this.factura.detalles = datos.data.detalles;
        this.factura.subtotal = datos.data.subtotal;
        this.factura.total = datos.data.total;
      });
    },
  },
  mounted() {
    this.getFactura();
  },
  filters: {
    format: function (value) {
      return value.slice(0, -15);
    },
  },
};
</script>
