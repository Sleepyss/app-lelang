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
                  Update Detail Petugas
                </h6>
              </div>
              <div class="card-body">
                <form @submit.prevent="submit">
                  <div class="form-group">
                    <label>Nama</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="users.nama_petugas"
                    />
                  </div>
                  <div class="form-group">
                    <label>Telephone</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="users.tlp_petugas"
                    />
                  </div>
                  <div class="form-group">
                    <label>Alamat</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="users.alamat"
                    />
                  </div>
                  <div class="form-group">
                    <div>
                      <label>Jenis Kelamin</label>
                    </div>
                    <div
                      class="btn-group btn-group-toggle"
                      data-toggle="buttons"
                    >
                      <label class="btn btn-secondary">
                        <input
                          type="radio"
                          value="L"
                          v-model="users.jenis_kelamin"
                        />
                        Laki - Laki
                      </label>
                      <label class="btn btn-secondary">
                        <input
                          type="radio"
                          value="P"
                          v-model="users.jenis_kelamin"
                        />
                        Perempuan
                      </label>
                    </div>
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
      id_petugas: {
        id_petugas: "",
      },
      users: {},
      id: {},
    };
  },
  created() {
    var data = JSON.parse(this.$store.state.datauser);

    var level = data.level;
    console.log(this.id);

    if (level == "masyarakat") {
      this.$swal("Error", "Anda tidak dapat mengakses halam ini", "error");
      this.$router.push("/");
    }

    this.axios
      .get(
        `http://localhost/lelangOn/public/api/user/show/${this.$route.params.id}`
      )
      .then((res) => {
        this.axios
          .get(
            `http://localhost/lelangOn/public/api/petugas/${res.data.id_petugas}`
          )
          .then((res) => {
            this.users = res.data;
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },
  methods: {
    submit() {
      this.axios
        .post(`http://localhost/lelangOn/public/api/petugas/store`, this.users)
        .then(() => {
          this.axios
            .get(
              `http://localhost/lelangOn/public/api/petugas/maxid/${this.$route.params.id}`
            )
            .then((res) => {
              this.id_petugas.id_petugas = res.data;
              this.axios
                .put(
                  `http://localhost/lelangOn/public/api/user/update/petugas/${this.$route.params.id}`,
                  this.id_petugas
                )
                .then(() => {
                  this.$swal(
                    "Success",
                    "Penambahan Detail Berhasil ",
                    "success"
                  );
                  this.$router.push("/users/detail/" + this.$route.params.id);
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