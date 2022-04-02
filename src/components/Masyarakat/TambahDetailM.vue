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
                <h6 class="m-0 font-weight-bold text-primary">
                  Update Detail Masyarakat
                </h6>
              </div>
              <div class="card-body">
                <form @submit.prevent="submit">
                  <input
                    type="hidden"
                    class="form-control"
                    v-model="users.id_masyarakat"
                  />
                  <div class="form-group">
                    <label>Nama</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="users.nama_masyarakat"
                    />
                  </div>
                  <div class="form-group">
                    <label>Telephone</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="users.tlp_masyarakat"
                    />
                  </div>
                  <div class="form-group">
                    <label>Alamat</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="users.alamat_masyarakat"
                    />
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
      <footer-component></footer-component>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: {},
      id_masyarakat: {
        id_masyarakat: "",
      },
    };
  },
  created() {
    var data = JSON.parse(this.$store.state.datauser);
    var id = data.id_masyarakat;

    var level = data.level;

    if (level == "petugas" || level == "admin") {
      this.$swal("Error", "Anda tidak dapat mengakses halam ini", "error");
      this.$router.push("/");
    }

    this.axios
      .get(`http://localhost/lelangOn/public/api/masyarakat/${id}`)
      .then((res) => {
        this.users = res.data;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    submit() {
      this.axios
        .post(
          `http://localhost/lelangOn/public/api/masyarakat/store`,
          this.users
        )
        .then(() => {
          this.axios
            .get(
              `http://localhost/lelangOn/public/api/masyarakat/maxid/${this.$route.params.id}`
            )
            .then((res) => {
              this.id_masyarakat.id_masyarakat = res.data;
              this.axios
                .put(
                  `http://localhost/lelangOn/public/api/user/update/masyarakat/${this.$route.params.id}`,
                  this.id_masyarakat
                )
                .then(() => {
                  this.$store.commit("clearToken");
                  this.$store.commit("clearUser");
                  this.$swal("Success", "Mohon login kembali ", "success");
                  this.$router.push("/login");
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>