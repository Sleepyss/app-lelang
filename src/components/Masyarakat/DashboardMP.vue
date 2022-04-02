<template>
  <div id="wrapper">
    <sidebar-component></sidebar-component>
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <navbar-component></navbar-component>
        <!-- Section-->
        <section class="py-5">
          <div class="container-fluid px-4 px-lg-5 mt-5">
            <div
              class="
                row
                gx-4 gx-lg-5
                row-cols-2 row-cols-md-3 row-cols-xl-4
                justify-content-center
              "
            >
              <div v-for="(l, index) in lelang" :key="index" class="col mb-5">
                <div class="card h-100">
                  <!-- Product image-->
                  <img
                    class="card-img-top"
                    src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                    alt="..."
                  />
                  <!-- Product details-->
                  <div class="card-body p-4">
                    <div class="text-center">
                      <!-- Product name-->
                      <h5 class="font-weight-bolder">{{ l.nama_barang }}</h5>
                      <!-- Product price-->
                      Rp. {{ l.harga_akhir }}
                    </div>
                  </div>
                  <!-- Product actions-->
                  <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                      <router-link
                        :to="{
                          name: 'detaillelangm',
                          params: { id: l.id_lelang },
                        }"
                        ><a class="btn btn-outline-dark mt-auto"
                          >Detail</a
                        ></router-link
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer-component></footer-component>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: "",
      lelang: {},
    };
  },
  created() {
    var user = JSON.parse(this.$store.state.datauser);
    this.role = user.level;

    if (this.role == "admin" || this.role == "petugas") {
      this.$swal("Error", "Anda tidak dapat mengakses halam ini", "error");
      this.$router.push("/");
    }
    this.axios
      .get("http://localhost/lelangOn/public/api/lelang/available")
      .then((res) => {
        this.lelang = res.data.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>