<template>
  <div class="editar">
    <div class="container">
      <h2>Factura #{{ factura.id }}</h2>
      <br />
      <br />
      <div class="form-group row mt-2">
        <span class="col-sm-2"></span>
        <label for="inputEmail3" class="col-sm-2 col-form-label"
          >Nombre del Cliente</label
        >
        <div class="col-sm-6">
          <input
            type="text"
            class="form-control"
            placeholder="ej. Juan Perez"
            v-model="factura.nombre"
          />
        </div>
      </div>
      <br />
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
            <td>
              <input type="text" class="form-control" v-model="d.articulo" />
            </td>
            <td>
              <input type="number" class="form-control" v-model="d.cantidad" />
            </td>
            <td>
              <input type="number" class="form-control" v-model="d.valor" />
            </td>
          </tr>
        </tbody>
      </table>
      <h4>
        <b>Subtotal: ${{ calcularSubtotal }}</b>
      </h4>
      <h4>
        <b>Total: ${{ calcularTotal }}</b>
      </h4>
      <br />
      <div>
        <b-button squared variant="primary" @click="guardarCambios()"
          >Guardar Cambios</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const URL_SERVER = "http://localhost:8080/facturas-ws/api/factura/";

export default {
  name: "Editar",
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

    guardarCambios() {
      let url = URL_SERVER;

      let body = {
        numFactura: this.factura.id,
        nomCliente: this.factura.nombre,
        detalles: this.factura.detalles,
      };

      axios.put(url, body).then((datos) => {
        if (datos.status) {
          alert("se han guardado los cambios");
          this.$router.push("/");
        } else {
          alert("No se pudo realizar la actualización " + datos.data);
        }
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

  computed: {
    calcularSubtotal() {
      let subtotal = 0;
      for (var i in this.factura.detalles) {
        subtotal +=
          this.factura.detalles[i].cantidad * this.factura.detalles[i].valor;
      }

      return subtotal;
    },

    calcularTotal() {
      let subtotal = 0;
      for (var i in this.factura.detalles) {
        subtotal +=
          this.factura.detalles[i].cantidad * this.factura.detalles[i].valor;
      }

      return subtotal * 0.19 + subtotal;
    },
  },
};
</script>
