<template>
  <div id="wrapper">
    <sidebar-component></sidebar-component>
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <navbar-component></navbar-component>
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-8">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Tambah Lelang</h6>
              </div>
              <div class="card-body">
                <form @submit.prevent="tambah">
                  <div class="form-group">
                    <label>Barang </label>
                    <select v-model="lelang.id_barang">
                      <option
                        v-for="(b, index) in barang"
                        :key="index"
                        :value="b.id_barang"
                      >
                        {{ b.nama_barang }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Harga Awal </label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="lelang.harga_akhir"
                    />
                  </div>
                  <!-- <div class="form-group">
                    <label>Petugas </label>
                    <select v-model="lelang.id_petugas">
                      <option
                        v-for="(p, index) in petugas"
                        :key="index"
                        :value="p.id_petugas"
                      >
                        {{ p.nama_petugas }}
                      </option>
                    </select>
                  </div> -->
                  <button type="submit" class="btn btn-success btn-block">
                    Simpan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer-component></footer-component>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lelang: {
        id_petugas: "",
      },
      masyarakat: {},
      barang: {},
      petugas: {},
      id_user: {
        id: "",
      },
    };
  },
  created() {
    var data = JSON.parse(this.$store.state.datauser);
    this.id_user.id = data.id;
    this.lelang.id_petugas = data.id_petugas;

    var level = data.level;

    if (level == "admin") {
      this.$swal("Error", "Anda tidak dapat mengakses halam ini", "error");
      this.$router.push("/");
    } else if (level == "masyarakat") {
      this.$swal("Error", "Anda tidak dapat mengakses halam ini", "error");
      this.$router.push("/dashboard");
    }

    this.axios
      .get(
        "http://localhost/lelangOn/public/api/user/allid/petugas/" +
          this.id_user.id
      )
      .then((res) => {
        this.petugas = res.data;
      })
      .catch((err) => console.log(err));

    this.axios
      .get("http://localhost/lelangOn/public/api/barang")
      .then((res) => {
        this.barang = res.data;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    tambah() {
      this.axios
        .post("http://localhost/lelangOn/public/api/lelang/store", this.lelang)
        .then((res) => {
          this.$swal("Success", res.data.message, "success");
          this.$router.push("/lelang");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>