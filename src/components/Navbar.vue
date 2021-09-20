<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#" @click="irHome"
        ><img
          src="https://citoyd.com/wp-content/uploads/2020/07/ENCONTA_ICONO_FACTURA_1_0.png"
          width="80px"
          alt=""
      /></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link to="/" tag="b-nav-item">Mis Facturas</router-link>
          <router-link to="/nueva" tag="b-nav-item">Crear Factura</router-link>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <br />
    <br />
  </div>
</template>
