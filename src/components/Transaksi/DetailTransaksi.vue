<template>
  <div id="wrapper">
    <sidebar-component></sidebar-component>
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <navbar-component></navbar-component>
        <div class="container-fluid">
          <h1 class="h3 mb-4 text-gray-800">Transaksi</h1>
          <div class="row">
            <div class="col">
              <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold text-primary">Pembayaran</h6>
                </div>
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col-md-4 text-center">
                      <img src="" alt="image" />
                    </div>
                    <div class="col mr-2">
                      <div class="row">
                        <div class="col">
                          <div
                            class="
                              text-xs
                              font-weight-bold
                              text-primary text-uppercase
                            "
                          >
                            Nama Barang
                          </div>
                          <div
                            class="h6 mb-0 font-weight-bold text-gray-800 mb-2"
                          >
                            {{ transaksi.nama_barang }}
                          </div>
                          <div
                            class="
                              text-xs
                              font-weight-bold
                              text-primary text-uppercase
                            "
                          >
                            Penjual
                          </div>
                          <div
                            class="h6 mb-0 font-weight-bold text-gray-800 mb-2"
                          >
                            {{ transaksi.nama_petugas }}
                          </div>
                          <div
                            class="
                              text-xs
                              font-weight-bold
                              text-primary text-uppercase
                            "
                          >
                            Tanggal Lelang
                          </div>
                          <div
                            class="h6 mb-0 font-weight-bold text-gray-800 mb-2"
                          >
                            {{ transaksi.tgl_lelang | moment("DD/MM/YYYY") }}
                          </div>
                        </div>
                        <div class="col">
                          <div
                            class="
                              text-xs
                              font-weight-bold
                              text-primary text-uppercase
                            "
                          >
                            Pembeli
                          </div>
                          <div
                            class="h6 mb-0 font-weight-bold text-gray-800 mb-2"
                          >
                            {{ transaksi.nama_masyarakat }}
                          </div>
                          <div
                            class="
                              text-xs
                              font-weight-bold
                              text-primary text-uppercase
                            "
                          >
                            Status
                          </div>
                          <span
                            v-if="transaksi.pembayaran == 'sudah'"
                            class="badge bg-success text-light"
                            >Sudah</span
                          >
                          <span
                            v-if="transaksi.pembayaran == 'belum'"
                            class="badge bg-danger text-light"
                            >Belum</span
                          >
                        </div>
                      </div>
                      <div class="col-xl-8 col-md-8 mb-4">
                        <div class="card border-left-success shadow h-100 py-2">
                          <div class="card-body">
                            <div class="row no-gutters align-items-center">
                              <div class="col mr-3">
                                <div
                                  class="
                                    text-xs
                                    font-weight-bold
                                    text-primary text-uppercase
                                    mb-1
                                  "
                                >
                                  Harga Penawaran Terbesar
                                </div>
                                <div
                                  class="h5 mb-0 font-weight-bold text-gray-800"
                                >
                                  Rp. {{ transaksi.harga_akhir }}
                                </div>
                              </div>
                              <div class="col-auto">
                                <i
                                  class="fas fa-dollar-sign fa-2x text-gray-300"
                                ></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="card shadow mb-4">
                        <div class="card-header py-3">
                          <h6 class="m-0 font-weight-bold text-primary">
                            Deskripsi
                          </h6>
                        </div>
                        <div class="card-body">
                          {{ transaksi.deskripsi }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <button
                  type="button"
                  class="btn btn-success mr-3"
                  @click="bayar"
                >
                  Bayar
                </button>
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
      transaksi: {},
      level: {},
    };
  },
  created() {
    var data = JSON.parse(this.$store.state.datauser);
    this.level = data.level;

    this.axios
      .get(
        `http://localhost/lelangOn/public/api/transaksi/${this.$route.params.id}`
      )
      .then((res) => {
        this.transaksi = res.data;
      })
      .catch((err) => console.log(err));
  },
  computed: {},
  methods: {
    bayar() {
      this.axios
        .post(
          `http://localhost/lelangOn/public/api/transaksi/status/${this.$route.params.id}`
        )
        .then(() => {
          this.$router.go();
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>