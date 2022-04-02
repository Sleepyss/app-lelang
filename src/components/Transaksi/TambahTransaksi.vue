<template>
  <div id="wrapper">
    <sidebar-component></sidebar-component>
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <navbar-component></navbar-component>
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-8">
              <div class="card shadow mb-4">
                <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold text-primary">
                    Tambah Transaksi
                  </h6>
                </div>
                <div class="card-body">
                  <form @submit.prevent="tambah">
                    <div class="form-group">
                      <label>ID Lelang</label>
                      <select v-model="transaksi.id_lelang">
                        <option
                          v-for="(l, index) in lelang"
                          :key="index"
                          :value="l.id_lelang"
                        >
                          {{ l.id_lelang }}
                        </option>
                      </select>
                      <select v-model="transaksi.id_petugas">
                        <option
                          v-for="(l, index) in lelang"
                          :key="index"
                          :value="l.id_petugas"
                        >
                          {{ l.id_lelang }}
                        </option>
                      </select>
                      <select v-model="transaksi.id_barang">
                        <option
                          v-for="(l, index) in lelang"
                          :key="index"
                          :value="l.id_barang"
                        >
                          {{ l.id_lelang }}
                        </option>
                      </select>
                      <select v-model="transaksi.id_masyarakat">
                        <option
                          v-for="(l, index) in lelang"
                          :key="index"
                          :value="l.id_masyarakat"
                        >
                          {{ l.id_lelang }}
                        </option>
                      </select>
                      <input type="text" v-model="transaksi.hargabarang" />
                    </div>
                    <button type="submit" class="btn btn-success btn-block">
                      Simpan
                    </button>
                  </form>
                </div>
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
      masyarakat: {},
      lelang: {},
      lelangstore: {},
      transaksi: {
        id_petugas: "",
        id_masyarakat: "",
        id_barang: "",
        id_lelang: "",
        hargabarang: "",
      },
    };
  },
  created() {
    var data = JSON.parse(this.$store.state.datauser);

    var level = data.level;

    if (level == "admin") {
      this.$swal("Error", "Anda tidak dapat mengakses halam ini", "error");
      this.$router.push("/");
    } else if (level == "masyarakat") {
      this.$swal("Error", "Anda tidak dapat mengakses halam ini", "error");
      this.$router.push("/dashboard");
    }
    console.log(this.transaksi);

    this.axios
      .get(
        `http://localhost/lelangOn/public/api/lelang/${this.$route.params.id}`
      )
      .then((res) => {
        this.lelang = res.data;
        this.transaksi.id_masyarakat = res.data.id_masyarakat;
        this.transaksi.id_lelang = res.data.id_lelang;
        this.transaksi.id_petugas = res.data.id_petugas;
        this.transaksi.id_barang = res.data.id_barang;
        this.transaksi.hargabarang = res.data.harga_akhir;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    tambah() {
      this.axios
        .post(
          "http://localhost/lelangOn/public/api/transaksi/store",
          this.transaksi
        )
        .then(() => {
          this.$router.push("/transaksi");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
