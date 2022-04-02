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
                  Tambah Data Member
                </h6>
              </div>
              <div class="card-body">
                <form @submit.prevent="tambah">
                  <div class="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="users.username"
                    />
                  </div>
                  <div class="form-group">
                    <label>Password</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="users.password"
                    />
                  </div>
                  <div class="form-group">
                    <div>
                      <label>Level</label>
                    </div>
                    <div
                      class="btn-group btn-group-toggle"
                      data-toggle="buttons"
                    >
                      <label class="btn btn-secondary">
                        <input
                          type="radio"
                          value="admin"
                          v-model="users.level"
                        />
                        Admin
                      </label>
                      <label class="btn btn-secondary">
                        <input
                          type="radio"
                          value="petugas"
                          v-model="users.level"
                        />
                        Petugas
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
      users: {},
    };
  },
  methods: {
    tambah() {
      this.axios
        .post("http://localhost/lelangOn/public/api/user/add", this.users)
        .then((res) => {
          if (res.data.success) {
            this.$swal("Success", res.data.message, "success");
            this.$router.push("/users");
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>