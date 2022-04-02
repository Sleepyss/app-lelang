<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-xl-10 col-lg-12 col-md-9">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <div class="row">
              <div
                class="col-lg-6 d-none d-lg-block bg-login-image"
                width="100%"
              ></div>
              <div class="col-lg-6">
                <div class="p-5">
                  <div class="text-center">
                    <div class="h4 text-gray-900 mb-4">Selamat Datang</div>
                  </div>

                  <form class="user" @submit.prevent="login">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control form-control-user"
                        placeholder="Masukkan username"
                        v-model="account.username"
                      />
                    </div>

                    <div class="form-group">
                      <input
                        type="password"
                        class="form-control form-control-user"
                        placeholder="Masukkan password"
                        v-model="account.password"
                      />
                    </div>

                    <button
                      type="submit"
                      class="btn btn-primary btn-user btn-block"
                    >
                      Login
                    </button>
                  </form>
                  <hr />
                  <div class="text-center">
                    <a class="small" href="/register">Create an Account!</a>
                  </div>
                </div>
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
      account: {},
    };
  },
  methods: {
    login() {
      this.axios
        .post("http://localhost/lelangOn/public/api/login", this.account)
        .then((res) => {
          if (res.data.success) {
            this.$store.commit("setToken", res.data.token);
            this.$store.commit("setUser", JSON.stringify(res.data.user));
            if (
              res.data.user.level == "admin" ||
              res.data.user.level == "petugas"
            ) {
              this.$router.push("/");
            }
            if (res.data.user.level == "masyarakat") {
              this.$router.push("/dashboard");
            }
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>