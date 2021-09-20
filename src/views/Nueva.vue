<template>
  <div id="nueva">
    <div class="container">
      <h2>Nueva Factura</h2>
      <br /><br />
      <form>
        <div class="form-group row mt-2">
          <span class="col-sm-2"></span>
          <label for="inputEmail3" class="col-sm-2 col-form-label"
            >Nombre del Cliente</label
          >
          <div class="col-sm-6">
            <input
              type="text"
              class="form-control"
              id="inputEmail3"
              placeholder="ej. Juan Perez"
              v-model="factura.nomCliente"
            />
          </div>
        </div>
      </form>
      <br />
      <div style="text-align: right">
        <b-button v-b-modal.modalPopover>Añadir Articulo</b-button>
      </div>
      <b-modal
        id="modalPopover"
        @ok="guardarDetalle"
        title="Nuevo Detalle"
        ok-only
      >
        <form>
          <div class="form-group row mt-2">
            <label for="inputEmail3" class="col-sm-2 col-form-label"
              >Articulo</label
            >
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="inputEmail3"
                placeholder="ej. Camiseta Bluex"
                v-model="detalle.articulo"
              />
            </div>
          </div>
          <div class="form-group row mt-2">
            <label for="inputEmail3" class="col-sm-2 col-form-label"
              >Valor</label
            >
            <div class="col-sm-10">
              <input
                type="number"
                min="1"
                class="form-control"
                id="inputEmail3"
                v-model="detalle.valor"
              />
            </div>
          </div>
          <div class="form-group row mt-2">
            <label for="inputEmail3" class="col-sm-2 col-form-label"
              >Cantidad</label
            >
            <div class="col-sm-10">
              <input
                type="number"
                min="1"
                class="form-control"
                id="inputEmail3"
                v-model="detalle.cantidad"
              />
            </div>
          </div>
        </form>
      </b-modal>

      <br />
      <br />
      <table class="table table-bordered table-hover">
        <thead class="table-dark">
          <tr>
            <th scope="col">Articulo</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Valor</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d of factura.detalles" :key="d.articulo">
            <td>{{ d.articulo }}</td>
            <td>{{ d.cantidad }}</td>
            <td>{{ d.valor }}</td>
            <td>
              <b-icon
                icon="x-circle"
                scale="2"
                variant="danger"
                @click="eliminarDetalle(d.articulo)"
              ></b-icon>
            </td>
          </tr>
          <tr>
            <td colspan="3"><b>Subtotal</b></td>
            <td>
              <b>$ {{ calcularSubtotal }}</b>
            </td>
          </tr>
        </tbody>
      </table>
      <h4>
        <b>Total: {{ calcularTotal }}</b>
      </h4>
      <br />
      <div>
        <b-button squared variant="primary" @click="enviarFactura"
          >Guardar</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const URL_SERVER = "http://localhost:8080/facturas-ws/api/factura/";

export default {
  name: "Nueva",
  data() {
    return {
      detalle: {
        articulo: "",
        cantidad: "",
        valor: "",
      },

      factura: {
        nomcliente: "",
        detalles: [],
        subtotal: 0,
        total: 0,
      },
    };
  },

  methods: {
    guardarDetalle() {
      if (this.factura.detalles.length < 2) {
        this.factura.detalles.push(this.detalle);
      } else {
        alert("Excede el limite de detalles");
      }
      this.detalle = {
        articulo: "",
        cantidad: "",
        valor: "",
      };
    },

    enviarFactura() {
      axios.post(URL_SERVER, this.factura).then((datos) => {
        if (datos.status) {
          alert("se han guardado los cambios");
          this.$router.push("/");
        } else {
          alert("No se pudo realizar la operacion " + datos.data);
        }
      });
    },

    eliminarDetalle(articulo) {
      console.log("articulo " + articulo);
      var results = this.factura.detalles.filter(function (nickname) {
        return nickname.articulo == articulo;
      });
      var firstObj = results.length > 0 ? results[0] : null;
      this.removeItemFromArr(this.factura.detalles, firstObj);
    },

    removeItemFromArr(arr, item) {
      var i = arr.indexOf(item);

      if (i !== -1) {
        arr.splice(i, 1);
      }
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
