<template>
  <div class="container">
    <div class="card o-hidden border-0 shadow-lg my-5">
      <div class="card-body p-0">
        <!-- Nested Row within Card Body -->
        <div class="row">
          <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
          <div class="col-lg-7">
            <div class="p-5">
              <div class="text-center">
                <h1 class="h4 text-gray-900 mb-4">Create an Account !</h1>
              </div>

              <form class="user" @submit.prevent="register">
                <div class="form-group row">
                  <div class="col-sm-6 mb-3 mb-sm-0">
                    <input
                      type="text"
                      class="form-control form-control-user"
                      v-model="user.username"
                      placeholder="Username"
                    />
                  </div>
                  <div class="col-sm-6">
                    <input
                      type="password"
                      class="form-control form-control-user"
                      v-model="user.password"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <!-- <div class="form-group">
                  <div>
                    <label>Level</label>
                  </div>
                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn btn-secondary">
                      <input type="radio" value="admin" v-model="user.level" />
                      Admin
                    </label>
                    <label class="btn btn-secondary">
                      <input
                        type="radio"
                        value="petugas"
                        v-model="user.level"
                      />
                      Petugas
                    </label>
                  </div>
                </div> -->
                <button
                  type="submit"
                  class="btn btn-primary btn-user btn-block"
                >
                  Register Account
                </button>
              </form>
              <hr />
              <div class="text-center">
                <a class="small" href="/login"
                  >Already have an account? Login!</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
    };
  },
  created() {},
  methods: {
    register() {
      this.axios
        .post("http://localhost/lelangOn/public/api/user/adds", this.user)
        .then((res) => {
          if (res.data.success) {
            if (res.data.success) {
              this.$swal("Success", res.data.message, "success");
              this.$router.push("/login");
            }
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>