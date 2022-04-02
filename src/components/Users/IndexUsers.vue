<template>
  <div id="wrapper">
    <sidebar-component></sidebar-component>
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <navbar-component></navbar-component>

        <div class="container-fluid">
          <h1 class="h3 mb-4 text-gray-800">Data Member</h1>
          <div class="row">
            <div class="col-lg-12">
              <div class="card shadow mb-4">
                <div class="card-body">
                  <div class="table-responsive">
                    <router-link
                      to="/users/tambah"
                      class="btn btn-info btn-icon-split"
                    >
                      <span class="icon text-white-50">
                        <i class="fas fa-plus"></i>
                      </span>
                      <span class="text">Tambah</span>
                    </router-link>
                    <table
                      class="table table-bordered mt-3"
                      width="100%"
                      cellspacing="0"
                    >
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Username</th>
                          <th>Level</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(u, index) in users" :key="index">
                          <td>{{ index + 1 }}</td>
                          <td>{{ u.username }}</td>
                          <td>{{ u.level }}</td>
                          <td>
                            <router-link
                              :to="{ name: 'detailuser', params: { id: u.id } }"
                              class="btn btn-success btn-circle"
                            >
                              <i class="far fa-eye"></i>
                            </router-link>
                            <router-link
                              :to="{
                                name: 'tambahdetailuser',
                                params: { id: u.id },
                              }"
                              class="btn btn-warning btn-circle"
                            >
                              <i class="fas fa-pen"></i>
                            </router-link>
                            <button
                              type="button"
                              @click="hapus(u.id)"
                              class="btn btn-danger btn-circle"
                            >
                              <i class="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
      users: {},
    };
  },
  created() {
    var data = JSON.parse(this.$store.state.datauser);
    var level = data.level;

    if (level == "petugas") {
      this.$swal("Error", "Anda tidak dapat mengakses halam ini", "error");
      this.$router.push("/");
    } else if (level == "masyarakat") {
      this.$swal("Error", "Anda tidak dapat mengakses halam ini", "error");
      this.$router.push("/dashboard");
    }

    this.axios
      .get("http://localhost/lelangOn/public/api/user/petugas")
      .then((res) => {
        this.users = res.data.data;
      });
  },
  methods: {
    hapus(id) {
      this.$swal
        .fire({
          title: "Anda yakin ingin menghapus?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya",
          cancelButtonText: "Batal",
        })
        .then((res) => {
          if (res.value) {
            this.axios
              .delete(`http://localhost/lelangOn/public/api/user/delete/${id}`)
              .then((res) => {
                if (res.data.success) {
                  let i = this.users.map((item) => item.id).indexOf(id);
                  this.users.splice(i, 1);
                  this.$swal("Sukses", res.data.message, "success");
                }
              })
              .catch((err) => console.log(err));
          }
        });
    },
  },
};
</script>